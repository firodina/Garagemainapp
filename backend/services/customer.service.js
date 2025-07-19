const bcrypt = require("bcrypt");
const db = require("../config/db.config");
const { sendEmail, sendSMS } = require("./notification.service"); // Adjust the path accordingly

// Add a new customer
// Backend - Service
async function addCustomer(customerData, isAdmin) {
  const insertCustomerIdentifierQuery = `
    INSERT INTO customer_identifier 
    (company_role_id, email, phone, registered_at, approved) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const insertCustomerInfoQuery = `
    INSERT INTO customer_info 
    (customer_id, first_name, last_name, address) 
    VALUES (?, ?, ?, ?)
  `;

  const insertCustomerPassQuery = `
    INSERT INTO customer_pass 
    (customer_id, customer_password_hashed) 
    VALUES (?, ?)
  `;

  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    registered_at,
    password,
  } = customerData;

  // Convert registered_at to the correct format
  const registeredAtDate = new Date(registered_at);
  const formattedRegisteredAt = registeredAtDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const approved = isAdmin ? 1 : 0;

  const connection = await db.pool.getConnection();
  try {
    await connection.beginTransaction();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [resultIdentifier] = await connection.query(
      insertCustomerIdentifierQuery,
      [4, email, phone, formattedRegisteredAt, approved] // Use formattedRegisteredAt here
    );

    const customer_id = resultIdentifier.insertId;

    await connection.query(insertCustomerInfoQuery, [
      customer_id,
      first_name,
      last_name,
      address,
    ]);

    await connection.query(insertCustomerPassQuery, [
      customer_id,
      hashedPassword,
    ]);

    await connection.commit();

    const welcomeMessage = `
Welcome to ORBIS Trading and Services Center, ${first_name}!

Your account has been created successfully.

📧 Email: ${email}
🔐 Password: ${password}

You can now log in and start using our services.

Thank you!
    `.trim();

    if (email) {
      await sendEmail(email, welcomeMessage, "Your ORBIS Account Details");
    }

    if (phone) {
      await sendSMS(phone, welcomeMessage);
    }

    return {
      customer_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      approved,
    };
  } catch (error) {
    await connection.rollback();
    console.error("Error adding customer:", error.message);
    throw new Error("Failed to add customer");
  } finally {
    await connection.release();
  }
}

async function getAllCustomers() {
  const connection = await db.pool.getConnection();
  try {
    const query = `
      SELECT 
        customer_info.customer_id, 
        customer_info.first_name, 
        customer_info.last_name, 
        customer_info.address, 
        customer_identifier.email, 
        customer_identifier.phone, 
        customer_identifier.registered_at, 
        customer_identifier.approved
      FROM customer_info
      JOIN customer_identifier 
      ON customer_info.customer_id = customer_identifier.customer_id
      ORDER BY customer_info.customer_id DESC`;

    const [rows] = await connection.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  } finally {
    connection.release();
  }
}
// to get customer by id
async function getCustomerById(customer_id) {
  const connection = await db.pool.getConnection();
  try {
    const query = `
      SELECT 
        customer_info.customer_id, 
        customer_info.first_name, 
        customer_info.last_name, 
        customer_info.address, 
        customer_identifier.email, 
        customer_identifier.phone, 
        customer_identifier.registered_at, 
        customer_identifier.approved
      FROM customer_identifier 
      INNER JOIN customer_info 
      ON customer_identifier.customer_id = customer_info.customer_id 
      WHERE customer_identifier.customer_id = ?`;

    const [rows] = await connection.query(query, [customer_id]);

    if (rows.length === 0) {
      return null; // No customer found
    }
    return rows[0]; // Return the first result
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw new Error("Failed to retrieve customer");
  } finally {
    connection.release();
  }
}
// customer update
async function updateCustomer(customerData) {
  const connection = await db.pool.getConnection();
  try {
    const { customer_id, first_name, last_name, address, email, phone } =
      customerData;

    const query = `
      UPDATE customer_info 
      JOIN customer_identifier 
      ON customer_info.customer_id = customer_identifier.customer_id 
      SET 
        customer_info.first_name = ?, 
        customer_info.last_name = ?, 
        customer_info.address = ?, 
        customer_identifier.email = ?, 
        customer_identifier.phone = ? 
      WHERE customer_info.customer_id = ?`;

    const [result] = await connection.query(query, [
      first_name,
      last_name,
      address,
      email,
      phone,
      customer_id,
    ]);

    if (result.affectedRows === 0) {
      return null; // No customer was updated
    }

    return { customer_id };
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Failed to update customer");
  } finally {
    connection.release();
  }
}
// delete customer
async function deleteCustomer(customerId) {
  const connection = await db.pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Get all appointment IDs for the customer
    const [appointments] = await connection.query(
      "SELECT appointment_id FROM appointments WHERE customer_id = ?",
      [customerId]
    );
    const appointmentIds = appointments.map((a) => a.appointment_id);

    // 2. Delete from appointment_notifications
    if (appointmentIds.length > 0) {
      await connection.query(
        "DELETE FROM appointment_notifications WHERE appointment_id IN (?)",
        [appointmentIds]
      );

      // 3. Delete from appointments
      await connection.query(
        "DELETE FROM appointments WHERE appointment_id IN (?)",
        [appointmentIds]
      );
    }

    // 4. Delete from house_service_requests
    await connection.query(
      "DELETE FROM house_service_requests WHERE customer_id = ?",
      [customerId]
    );

    // 5. Get all order IDs for the customer
    const [orders] = await connection.query(
      "SELECT order_id FROM orders WHERE customer_id = ?",
      [customerId]
    );
    const orderIds = orders.map((o) => o.order_id);

    // 6. Delete from order_services (child of orders)
    if (orderIds.length > 0) {
      await connection.query(
        "DELETE FROM order_services WHERE order_id IN (?)",
        [orderIds]
      );
    }

    // 7. Delete from orders
    await connection.query("DELETE FROM orders WHERE customer_id = ?", [
      customerId,
    ]);

    // 8. Delete from customer_info
    await connection.query("DELETE FROM customer_info WHERE customer_id = ?", [
      customerId,
    ]);

    // 9. Delete from customer_identifier
    const [result] = await connection.query(
      "DELETE FROM customer_identifier WHERE customer_id = ?",
      [customerId]
    );

    if (result.affectedRows === 0) {
      throw new Error("No customer found to delete");
    }

    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    console.error("Error deleting customer:", error);
    throw new Error("Failed to delete customer");
  } finally {
    connection.release();
  }
}

// Function to get a customer by email

async function getCustomerByEmail(email) {
  const query = `
    SELECT ci.customer_id, ci.company_role_id, ci.email, ci.phone, ci.registered_at, ci.approved,
           cii.customer_info_id, cii.first_name, cii.last_name, cii.address,
           cr.company_role_name AS role,
           cp.customer_password_hashed AS password_hash
    FROM customer_identifier ci
    LEFT JOIN customer_info cii ON ci.customer_id = cii.customer_id
    LEFT JOIN company_roles cr ON ci.company_role_id = cr.company_role_id
    LEFT JOIN customer_pass cp ON ci.customer_id = cp.customer_id
    WHERE ci.email = ?
    LIMIT 1;
  `;

  try {
    const [rows] = await db.pool.execute(query, [email]);

    if (rows.length > 0) {
      return rows[0];
    }

    return null; // No customer found
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Failed to retrieve customer by email");
  }
}

async function getCustomerStatus() {
  try {
    const rows = await db.query(`
      SELECT 
        COUNT(*) AS total_customers, 
        SUM(approved) AS approved_customers
      FROM customer_identifier
    `);

    const totalCustomers = rows.map((row) => row.total_customers);
    const approved_customers = rows.map((row) => row.approved_customers);
    const non_approved_customers = totalCustomers.map(
      (total, index) => total - approved_customers[index]
    );

    const data = {
      totalCustomers,
      approved_customers,
      non_approved_customers,
    };

    return data;
  } catch (error) {
    return error;
  }
}
const getCustomersByApprovalStatus = async (status) => {
  const rows = await db.query(
    ` SELECT 
  ci.customer_id,
  ci.email,
  ci.phone,
  ci.registered_at,
  ci.approved,
  info.first_name,
  info.last_name,
  info.address
FROM 
  customer_identifier ci
JOIN 
  customer_info info ON ci.customer_id = info.customer_id
WHERE 
  ci.approved = FALSE;`,
    [status]
  );
  return rows;
};

// Helper to format phone numbers (assumes Ethiopia +251 by default)
const formatToE164 = (phone, countryCode = "251") => {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  }
  return `+${countryCode}${cleaned}`;
};

const approveCustomer = async (customerId) => {
  try {
    // Step 1: Update the approval status
    const result = await db.query(
      "UPDATE customer_identifier SET approved = TRUE WHERE customer_id = ?",
      [customerId]
    );

    if (result.affectedRows === 0) {
      throw new Error("Customer not found");
    }

    // Step 2: Fetch the customer's email and phone
    const [customerData] = await db.query(
      "SELECT email, phone FROM customer_identifier WHERE customer_id = ?",
      [customerId]
    );

    const customerEmail = customerData?.email;
    const customerPhone = customerData?.phone;

    // Step 3: Prepare message
    const message = `✅ Your account has been approved! You can now log in.`;
    const subject = "Account Approval Notification";

    const notifications = [];

    if (customerEmail) {
      notifications.push(sendEmail([customerEmail], message, subject));
    }

    if (customerPhone) {
      const formattedPhone = formatToE164(customerPhone);
      notifications.push(sendSMS(formattedPhone, message));
    }

    // Step 4: Send notifications
    await Promise.all(notifications);

    return result;
  } catch (error) {
    console.error("Error in approveCustomer service:", error);
    throw error;
  } finally {
    connection.release();
  }
};

const unapproveCustomer = async (customerId) => {
  const query =
    "UPDATE customer_identifier SET approved = 0 WHERE customer_id = ?";
  const result = await db.execute(query, [customerId]); // use `execute` if using mysql2 or promise-based db
  return result;
};

async function changePassword(customerId, newPassword) {
  try {
    const query =
      "UPDATE customer_pass SET customer_password_hashed = ? WHERE customer_id = ?";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const result = await db.query(query, [hashedPassword, customerId]);

    console.log(result);
    if (result.affectedRows === 0) {
      throw new Error("Failed to update customer password.");
    }

    return true;
  } catch (error) {
    console.error("Service Error:", error.message);
    throw error;
  }
}

// Export all services
module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
  getCustomerStatus,
  getCustomersByApprovalStatus,
  approveCustomer,
  unapproveCustomer,
  changePassword,
};
