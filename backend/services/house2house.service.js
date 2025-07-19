const db = require("../config/db.config");
const axios = require('axios');
const { pool } = require("../config/db.config");
const { sendEmail, sendSMS } = require("./notification.service"); // Adjust to your actual file
const formatToE164 = (phone) => {
  return phone.startsWith("+") ? phone : "+251" + phone.slice(1);
};

// Insert a new vehicle for the customer
const insertVehicle = async ({
  customer_id,
  vehicle_type_id,
  make,
  model,
  vin,
}) => {
  const result = await db.query(
    `
    INSERT INTO vehicles (customer_id, vehicle_type_id, make, model, year, VIN)
    VALUES (?, ?, ?, ?, NULL, ?)
  `,
    [customer_id, vehicle_type_id, make, model, vin]
  );
  return result.insertId;
};

// Check if a customer has already requested a service at the same time
const checkDuplicateRequest = async ({
  customer_id,
  service_type_id,
  preferred_date,
  preferred_time,
}) => {
  const rows = await db.query(
    `
    SELECT * FROM house_service_requests
    WHERE customer_id = ? AND service_type_id = ? 
    AND preferred_date = ? AND preferred_time = ?
  `,
    [customer_id, service_type_id, preferred_date, preferred_time]
  );

  return rows.length > 0;
};



// const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY; // Store your API key in environment variables


// Free alternative using OpenStreetMap (Nominatim API)
const getCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'GarageSystem/1.0 (rowdahassan49@gmail.com)' 
    }
  });

  if (response.data && response.data.length > 0) {
    const location = response.data[0];
    return {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon)
    };
  } else {
    throw new Error("Address not found");
  }
};


const insertHouseServiceRequest = async ({
  customer_id,
  vehicle_id,
  service_type_id,
  address,
  preferred_date,
  preferred_time,
}) => {
  // Get coordinates from the address
let latitude, longitude;
try {
  const coordinates = await getCoordinates(address);
  latitude = coordinates.latitude;
  longitude = coordinates.longitude;
} catch (error) {
  console.error("Error getting coordinates:", error.message);
  throw new Error("Failed to retrieve coordinates for the address.");
}


  // Check for duplicate request at the same date and time
  const isDuplicate = await checkDuplicateRequest({
    customer_id,
    service_type_id,
    preferred_date,
    preferred_time,
  });
  
  if (isDuplicate) {
    const error = new Error(
      "Duplicate request: You already have a service booked at this date and time."
    );
    error.statusCode = 409; // Conflict status code
    throw error;
  }

  // Insert the house service request into the database
  await db.query(
    `INSERT INTO house_service_requests (
      customer_id, vehicle_id, service_type_id,
      address, latitude, longitude,
      preferred_date, preferred_time
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customer_id,
      vehicle_id,
      service_type_id,
      address,
      latitude,
      longitude,
      preferred_date,
      preferred_time,
    ]
  );

  // Notification system (added only)
  try {
    const [customer] = await db.query(
      `SELECT ci.first_name, ci.last_name, cid.email, cid.phone
       FROM customer_info ci
       JOIN customer_identifier cid ON ci.customer_id = cid.customer_id
       WHERE ci.customer_id = ?`,
      [customer_id]
    );

    const [service] = await db.query(
      `SELECT service_name FROM service_types WHERE service_type_id = ?`,
      [service_type_id]
    );

    const customerName = `${customer.first_name} ${customer.last_name}`;
    const message = `
      Hello ${customerName},

      Your house-to-house service request has been successfully scheduled.

      🛠 Service Type: ${service.service_name}
      📅 Date: ${preferred_date}
      ⏰ Time: ${preferred_time}
      📍 Address: ${address}

      Thank you for choosing ORBIS Trading and Services Center!
    `.trim();

    if (customer.email) {
      await sendEmail(customer.email, message, "House Service Request Confirmation");
    }

    if (customer.phone) {
      await sendSMS(customer.phone, message);
    }
  } catch (error) {
    console.error("❌ Failed to send notification:", error.message);
  }
};


const getAvailableEmployees = async () => {
  const result = await db.query(`
    SELECT e.employee_id, ei.employee_first_name, ei.employee_last_name
    FROM employee e
    JOIN employee_info ei ON e.employee_id = ei.employee_id
    WHERE e.employee_id NOT IN (
      SELECT assigned_employee_id
      FROM house_service_requests
      WHERE status NOT IN ('Completed', 'Canceled') AND assigned_employee_id IS NOT NULL
    )
    AND e.employee_id NOT IN (
      SELECT assigned_to
      FROM tasks
      WHERE task_status != 'Completed'
    )
    AND e.active_employee = TRUE
  `);
  return result;
};

// Get all house service requests sorted by preferred date and time
const getSortedHouseServiceRequests = async () => {
  const result = await db.query(`
    SELECT 
  hsr.request_id AS id,
  hsr.status,
  ci.first_name AS customer_first_name, 
  ci.last_name AS customer_last_name,
  s.service_name,
  v.make, 
  v.model, 
  v.VIN,
  hsr.address,
  hsr.preferred_date,
  hsr.preferred_time,
  hsr.assigned_employee_id
FROM house_service_requests hsr
JOIN customer_identifier c ON hsr.customer_id = c.customer_id
JOIN customer_info ci ON hsr.customer_id = ci.customer_id
JOIN service_types s ON hsr.service_type_id = s.service_type_id
JOIN vehicles v ON hsr.vehicle_id = v.vehicle_id
WHERE hsr.status != 'complete'
ORDER BY preferred_date ASC, preferred_time ASC;
  `);
  return result;
};

const assignEmployeeToRequest = async (request_id, employee_id) => {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // 1. Validate inputs
    if (!request_id || !employee_id) {
      throw new Error('Missing required parameters: request_id or employee_id');
    }

    // 2. Verify request exists
    const [requestExists] = await connection.query(
      `SELECT 1 FROM house_service_requests WHERE request_id = ?`,
      [request_id]
    );
    
    if (requestExists.length === 0) {
      throw new Error(`Request with ID ${request_id} not found`);
    }

    // 3. Update assignment
    const [updateResult] = await connection.query(
      `UPDATE house_service_requests
       SET assigned_employee_id = ?, status = 'In Progress'
       WHERE request_id = ? AND status != 'Completed'`,
      [employee_id, request_id]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error("Request already completed or invalid.");
    }

    // 4. Get request details with LEFT JOINs for safety
    const [requestDetails] = await connection.query(
      `SELECT 
        hsr.request_id,
        hsr.preferred_date,
        hsr.preferred_time,
        hsr.address,
        IFNULL(st.service_name, 'General Service') AS service_name,
        IFNULL(v.make, 'Unknown') AS make,
        IFNULL(v.model, 'Unknown') AS model
       FROM house_service_requests hsr
       LEFT JOIN service_types st ON hsr.service_type_id = st.service_type_id
       LEFT JOIN vehicles v ON hsr.vehicle_id = v.vehicle_id
       WHERE hsr.request_id = ?`,
      [request_id]
    );

    if (!requestDetails || requestDetails.length === 0) {
      console.error('Debug - Request details:', requestDetails);
      throw new Error("Failed to fetch updated request details");
    }

    const request = requestDetails[0];

    // 5. Get employee details
    const [employeeDetails] = await connection.query(
      `SELECT 
        ei.employee_first_name, 
        ei.employee_last_name,
        e.employee_email,
        ei.employee_phone
       FROM employee e
       JOIN employee_info ei ON e.employee_id = ei.employee_id
       WHERE e.employee_id = ? AND e.active_employee = TRUE`,
      [employee_id]
    );

    if (!employeeDetails || employeeDetails.length === 0) {
      throw new Error("Employee not found or inactive");
    }

    const employee = employeeDetails[0];

    // 6. Prepare notification
    const message = `
      Hello ${employee.employee_first_name} ${employee.employee_last_name},

      You have been assigned a new house-to-house service request.

      🛠 Service: ${request.service_name}
      📅 Date: ${request.preferred_date}
      ⏰ Time: ${request.preferred_time}
      📍 Address: ${request.address}

      Please proceed accordingly.

      - ORBIS Trading and Services Center
    `.trim();

    // 7. Send notifications
    const notifications = [];
    if (employee.employee_email) {
      notifications.push(sendEmail(employee.employee_email, message, "New Service Assignment"));
    }
    if (employee.employee_phone) {
      notifications.push(sendSMS(formatToE164(employee.employee_phone), message));
    }

    await Promise.all(notifications);
    await connection.commit();

    return {
      success: true,
      message: "Employee assigned successfully!",
      request_id,
      employee_id,
      service_name: request.service_name
    };

  } catch (error) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    console.error("❌ Error assigning employee:", error.message);
    throw {
      statusCode: 400,
      message: error.message || "Assignment failed due to unexpected error.",
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
const getRequestsByEmployeeId = async (employee_id) => {
  try {
    console.log('Querying DB for employee_id:', employee_id);
    
    if (!employee_id || isNaN(employee_id)) {
      throw new Error(`Invalid employee_id: ${employee_id}`);
    }

   const requests = await db.query(`
  SELECT 
    hsr.request_id AS id,
    hsr.status,
    ci.first_name AS customer_first_name,
    ci.last_name AS customer_last_name,
    s.service_name,
    v.make,
    v.model,
    v.VIN,
    hsr.address,
    hsr.latitude,       -- add latitude here
    hsr.longitude,      -- add longitude here
    hsr.preferred_date,
    hsr.preferred_time,
    hsr.assigned_employee_id,
    hsr.created_at
  FROM house_service_requests hsr
  JOIN customer_identifier c ON hsr.customer_id = c.customer_id
  JOIN customer_info ci ON hsr.customer_id = ci.customer_id
  JOIN service_types s ON hsr.service_type_id = s.service_type_id
  JOIN vehicles v ON hsr.vehicle_id = v.vehicle_id
  WHERE hsr.assigned_employee_id = ?
    AND hsr.status IN ('Assigned', 'In Progress', 'Scheduled')
  ORDER BY 
    hsr.preferred_date ASC, 
    hsr.preferred_time ASC
`, [employee_id]);


    console.log('DB query results:', requests);
    return requests; // Ensure this is an array
  } catch (error) {
    console.error("Database error in getRequestsByEmployeeId:", error.message);
    throw error;
  }
};
const markRequestAsCompleted = async (request_id) => {
  try {
    if (!request_id || isNaN(request_id)) {
      throw new Error("Invalid request_id");
    }

    const result = await db.query(
      `UPDATE house_service_requests
       SET status = 'Completed'
       WHERE request_id = ?`,
      [request_id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Request not found or already completed.");
    }

    return { success: true, message: "Request marked as completed." };
  } catch (error) {
    console.error("Error in markRequestAsCompleted:", error.message);
    throw {
      statusCode: 400,
      message: error.message || "Failed to update request status.",
    };
  }
};

module.exports = {
  insertVehicle,
  insertHouseServiceRequest,
  getAvailableEmployees,
  getSortedHouseServiceRequests,
  assignEmployeeToRequest,
  getRequestsByEmployeeId,
  markRequestAsCompleted,
};
