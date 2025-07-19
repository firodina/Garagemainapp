const conn = require("../config/db.config"); // adjust path based on your project



const { getServicesByOrderId } = require('./order.service'); // Adjust the path accordingly

const { sendEmail, sendSMS } = require("./notification.service"); // adjust path as needed

// Phone formatting helper (assumes Ethiopia country code by default)
const formatToE164 = (phone, countryCode = "251") => {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }
  return `+${countryCode}${cleaned}`;
};

const createTask = async (data) => {
  const { order_id, assigned_to, task_details, task_status } = data;

  const result = await conn.query(
    `INSERT INTO tasks (order_id, assigned_to, task_details, task_status) VALUES (?, ?, ?, ?)`,
    [order_id || null, assigned_to, task_details, task_status || "Pending"]
  );

  const task_id = result.insertId;

  // Step 3: Fetch the assigned employee's email and phone
  const [employeeData] = await conn.query(
    `SELECT e.employee_email, ei.employee_phone 
     FROM employee e 
     JOIN employee_info ei ON e.employee_id = ei.employee_id 
     WHERE e.employee_id = ?`,
    [assigned_to]
  );

  const employeeEmail = employeeData?.employee_email;
  const employeePhone = employeeData?.employee_phone;

  if (employeeEmail || employeePhone) {
    const message = `📋 You have a new task:\n📝 ${task_details}\n📦 Order ID: ${order_id}`;
    const subject = "New Task Assigned";

    const notifications = [];

    if (employeeEmail) {
      notifications.push(sendEmail([employeeEmail], message, subject));
    }

    if (employeePhone) {
      const formattedPhone = formatToE164(employeePhone);
      notifications.push(sendSMS(formattedPhone, message));
    }

    // Send all notifications in parallel
    await Promise.all(notifications);
  }

  return { task_id, ...data };
};


const getAllTasks = async () => {
  try {
    const rows = await conn.query(
      `SELECT 
        t.*, 
        e.employee_id,
        CONCAT(ei.employee_first_name, ' ', ei.employee_last_name) AS assigned_employee_name,
        ei.employee_phone AS assigned_employee_phone
       FROM tasks t
       LEFT JOIN employee e ON t.assigned_to = e.employee_id
       LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
       ORDER BY t.task_id DESC`
    );
    return rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

const getTaskById = async (taskId) => {
  const query = `
    SELECT 
      t.task_id,
      t.order_id,
      t.assigned_to,
      t.task_details,
      t.task_status,
      t.created_at,
      t.updated_at,
      e.employee_id,
      ei.employee_first_name,
      ei.employee_last_name,
      e.employee_email,
      e.employee_image
    FROM tasks t
    LEFT JOIN employee e ON t.assigned_to = e.employee_id
    LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
    WHERE t.task_id = ?;
  `;

  try {
    const rows = await conn.query(query, [taskId]);

    if (rows.length === 0) {
      return null; 
    }

    return rows[0];
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw error;
  }
};
// In your task controller
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task_status } = req.body; // Destructure from body

    // Update only the status if that's all you need
    await conn.query(
      `UPDATE tasks SET task_status = ? WHERE task_id = ?`,
      [task_status, id]
    );

    res.status(200).json({ 
      success: true,
      message: "Task updated successfully"
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ 
      success: false,
      message: error.message || "Failed to update task"
    });
  }
};
const deleteTask = async (id) => {
  await conn.query(`DELETE FROM tasks WHERE task_id = ?`, [id]);
};

// Get all tasks assigned to a specific employee
const getOrdersByAssignedEmployee = async (employeeId) => {
  try {
    console.log("Fetching orders for employee ID:", employeeId); // Log the employee ID
    const rows = await conn.query(
      `
      SELECT 
        o.order_id,
        o.customer_id,
        o.vehicle_id,
        o.employee_id AS main_order_employee,
        o.order_date,
        o.total_price,
        os.status AS order_status,
        os.updated_at AS order_status_updated,
        t.task_id,
        t.task_details,
        t.task_status,
        t.created_at AS task_created_at
      FROM tasks t
      LEFT JOIN orders o ON t.order_id = o.order_id
      LEFT JOIN order_status os ON o.order_id = os.order_id
      WHERE t.assigned_to = ?
      ORDER BY t.created_at DESC
      `,
      [employeeId]
    );

    console.log("Retrieved rows:", rows); // Log the retrieved rows
    return rows;
  } catch (error) {
    console.error("Error fetching orders by assigned employee:", error);
    throw error;
  }
};
 // ✅ New 1: Update a service as completed or not
 const updateServiceCompleted = async (orderId, serviceId, completed) => {
  try {
    await conn.query(
      `UPDATE order_services SET service_completed = ? WHERE order_id = ? AND service_id = ?`,
      [completed, orderId, serviceId]
    );
  } catch (error) {
    console.error("Error updating service completion:", error);
    throw error;
  }
};

const updateTaskCompleted = async (orderId) => {
  try {
    // 1. Update order_status
    const orderStatusResult = await conn.query(
      `UPDATE order_status SET status = 'Completed', updated_at = NOW() WHERE order_id = ?`,
      [orderId]
    );

    if (orderStatusResult.affectedRows === 0) {
      throw new Error(`Order ${orderId} not found in order_status table`);
    }

    // 2. Update tasks table
    const taskResult = await conn.query(
      `UPDATE tasks SET task_status = 'Completed', updated_at = NOW() WHERE order_id = ?`,
      [orderId]
    );

    // 3. Get customer contact info
    const rows = await conn.query(
      `
      SELECT ci.email, ci.phone
      FROM orders o
      JOIN customer_identifier ci ON o.customer_id = ci.customer_id
      WHERE o.order_id = ?
      `,
      [orderId]
    );

    const customer = rows[0];

    if (!customer) {
      throw new Error(`Customer info not found for order ID ${orderId}`);
    }

    const { email, phone } = customer;

    const message = `
✅ Dear Customer Your order with ID ${orderId} has been completed.
Thank you for choosing ORBIS Trading and Services Center!
    `.trim();

    const subject = "Order Completed – ORBIS Garage";

    const notifications = [];

    if (email) {
      notifications.push(sendEmail(email, message, subject));
    }

    if (phone) {
      const formattedPhone = formatToE164(phone);
      notifications.push(sendSMS(formattedPhone, message));
    }

    await Promise.all(notifications);

    return {
      success: true,
      message: `Order ${orderId} completed and customer notified.`,
      affectedRows: {
        orderStatus: orderStatusResult.affectedRows,
        tasks: taskResult.affectedRows,
      },
    };
  } catch (error) {
    console.error("❌ Error completing task and sending notification:", error.message);
    throw error;
  }
};



const getOrderServices = async (orderId) => {
  try {
    const query = `
      SELECT 
  os.*,
  s.service_name,
  s.service_description,
  s.service_price,
  s.duration
FROM order_services os
JOIN services s ON os.service_id = s.service_id
WHERE os.order_id = ?
ORDER BY os.service_id

    `;
    const rows = await conn.query(query, [orderId]);
    return rows;
  } catch (error) {
    console.error("Error fetching order services:", error);
    throw error;
  }
};


const getOrderDetails = async (orderId) => {
  try {
    const orderQuery = `SELECT 
  os.order_service_id,
  os.service_type_id,
  os.order_id,
  os.service_status,
  st.service_name,
  st.description,
  ss.status AS latest_update_status,
  ss.update_time
FROM 
  order_services os
JOIN 
  service_types st ON os.service_type_id = st.service_type_id
LEFT JOIN 
  service_status_updates ss ON ss.status_update_id = (
    SELECT ssu.status_update_id
    FROM service_status_updates ssu
    WHERE ssu.order_service_id = os.order_service_id
    ORDER BY ssu.update_time DESC
    LIMIT 1
  )
WHERE 
  os.order_id = ?
`;
    
    const orderResult = await conn.query(orderQuery, [orderId]);
    
    if (orderResult.length === 0) {
      throw new Error("Order not found");
    }

    const order = orderResult[0];
    
    // Get services for this order
    const services = await getServicesByOrderId(orderId);
    
    return {
      ...order,
      services
    };
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};


const updateServiceStatus = async (orderId, serviceId, completed) => {
  try {
    await conn.query(
      `UPDATE order_services 
       SET service_completed = ?, completed_at = IF(?, NOW(), NULL) 
       WHERE order_id = ? AND service_id = ?`,
      [completed, completed, orderId, serviceId]
    );
  } catch (error) {
    console.error("Error updating service status:", error);
    throw error;
  }
};

// Get completed tasks by employee ID
const getCompletedTasksByEmployee = async (employeeId) => {
  try {
    const rows = await conn.query(
      `
      SELECT 
        t.task_id,
        t.order_id,
        t.task_details,
        t.task_status,
        t.created_at,
        t.updated_at,
        o.customer_id,
        os.status AS order_status
      FROM tasks t
      LEFT JOIN orders o ON t.order_id = o.order_id
      LEFT JOIN order_status os ON o.order_id = os.order_id
      WHERE t.assigned_to = ? AND t.task_status = 'Completed'
      ORDER BY t.updated_at DESC
      `,
      [employeeId]
    );

    console.log("Retrieved completed tasks for employee ID:", employeeId);
    return rows;
  } catch (error) {
    console.error("Error fetching completed tasks by employee:", error);
    throw error;
  }
};




module.exports = {
  deleteTask,
  updateTask,
  getTaskById,
  getAllTasks,
  createTask,
  getOrdersByAssignedEmployee,
  getOrderServices,
  getOrderDetails,
  updateServiceStatus,
  updateTaskCompleted,
  updateServiceCompleted,
  getCompletedTasksByEmployee,
 
  
};