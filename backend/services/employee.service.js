const bcrypt = require("bcrypt");
const conn = require("../config/db.config");
const { pool, query } = require("../config/db.config");
const { sendEmail, sendSMS } = require("./notification.service");

const formatToE164 = (phone) => {
  return phone.startsWith("+") ? phone : "+251" + phone.slice(1);
};
/// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  console.log("Checking employee existence for email:", email);
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  return rows.length > 0;
}

// Update createEmployee function
async function createEmployee(row1, row2, row3, employee_password) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee_password, salt);

    // 1. Insert into `employee` table
    const query =
      "INSERT INTO employee (employee_email, active_employee, added_date, employee_image) VALUES (?, ?, NOW(), ?)";
    const rows = await conn.query(query, [row1[0], row1[1], row1[2]]);
    if (rows.affectedRows !== 1) return false;

    const employee_id = rows.insertId;

    // 2. Insert into `employee_info`
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      row2[0],
      row2[1],
      row2[2],
    ]);
    if (rows2.affectedRows !== 1) return false;

    // 3. Insert into `employee_pass`
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    if (rows3.affectedRows !== 1) return false;

    // 4. Insert into `employee_role`
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [employee_id, row3[0]]);
    if (rows4.affectedRows !== 1) return false;

    // 5. Send welcome SMS and email with login info
    const employee_email = row1[0];
    const employee_phone = row2[2];
    const fullName = `${row2[0]} ${row2[1]}`;

    const message = `
🎉 Welcome to ORBIS, ${fullName}!

Your employee account has been successfully created.

📧 Email: ${employee_email}
🔐 Temporary Password: ${employee_password}

Please log in and change your password as soon as possible.

ORBIS Trading and Services Center.
    `.trim();

    const subject = "Your ORBIS Employee Account";

    const notifications = [];

    if (employee_email) {
      notifications.push(sendEmail(employee_email, message, subject));
    }

    if (employee_phone) {
      const formattedPhone = formatToE164(employee_phone);
      notifications.push(sendSMS(formattedPhone, message));
    }

    await Promise.all(notifications);

    console.log("✅ Employee created and notified.");
    return true;
  } catch (err) {
    console.error("❌ Error creating employee:", err);
    return false;
  }
}

//   // A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}

// A function to get all employees
const getAllEmployees = async () => {
  try {
    // Fetch employee data including image URL
    const rows = await conn.query(`
      SELECT e.employee_id, e.employee_email, e.active_employee, e.added_date, e.employee_image,
             ei.employee_first_name, ei.employee_last_name, ei.employee_phone,
             er.company_role_id
      FROM employee e
      JOIN employee_info ei ON e.employee_id = ei.employee_id
      JOIN employee_role er ON e.employee_id = er.employee_id
    `);

    // Construct full image URL if using a URL or static path
    const baseImageUrl = "http://localhost:3000"; // Update with your actual base URL or path

    const employees = rows.map((employee) => ({
      ...employee,
      employee_image: employee.employee_image
        ? baseImageUrl + employee.employee_image
        : null,
    }));

    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Error fetching employees");
  }
};
//get by id
const getEmployeeById = async (employee_id) => {
  try {
    // Query to fetch employee data by ID
    const rows = await conn.query(
      `
      SELECT e.employee_id, e.employee_email, e.active_employee, e.added_date, e.employee_image,
             ei.employee_first_name, ei.employee_last_name, ei.employee_phone,
             er.company_role_id
      FROM employee e
      JOIN employee_info ei ON e.employee_id = ei.employee_id
      JOIN employee_role er ON e.employee_id = er.employee_id
      WHERE e.employee_id = ?
    `,
      [employee_id]
    );

    // Check if any rows were returned
    if (rows.length === 0) {
      throw new Error(`Employee with ID ${employee_id} not found.`);
    }

    // Construct full image URL if using a URL or static path
    const baseImageUrl = "http://localhost:3000"; // Update with your actual base URL or path

    // Format the employee data
    const employee = {
      ...rows[0],
      employee_image: rows[0].employee_image
        ? baseImageUrl + rows[0].employee_image
        : null,
    };

    return employee;
  } catch (error) {
    console.error(`Error fetching employee with ID ${employee_id}:`, error);
    throw new Error("Error fetching employee details");
  }
};

// delete employee
async function deleteEmployee(employee_id) {
  console.log(employee_id);
  //check if employee id not null
  if (!employee_id) {
    return false;
  }

  // Delete from employee_role table
  const query2 = "DELETE FROM employee_role WHERE employee_id = ?";
  const rows2 = await conn.query(query2, [employee_id]);

  // Delete from employee_pass table
  const query3 = "DELETE FROM employee_pass WHERE employee_id = ?";
  const rows3 = await conn.query(query3, [employee_id]);

  // Delete from employee_info table
  const query4 = "DELETE FROM employee_info WHERE employee_id = ?";
  const rows4 = await conn.query(query4, [employee_id]);
  // Delete from employee table
  const query = "DELETE FROM employee WHERE employee_id = ?";
  const rows = await conn.query(query, [employee_id]);

  // Check if the deletion was successful
  if (
    rows.affectedRows === 1 &&
    rows2.affectedRows === 1 &&
    rows3.affectedRows === 1 &&
    rows4.affectedRows === 1
  ) {
    return true;
  } else {
    return false;
  }
}

async function updateEmployee(updatedEmployeeData) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const {
      employee_id,
      employee_first_name = null,
      employee_last_name = null,
      employee_phone = null,
      employee_email = null,
      employee_password,
    } = updatedEmployeeData;

    // Update email if provided
    if (employee_email !== null) {
      await connection.query(
        "UPDATE employee SET employee_email = ? WHERE employee_id = ?",
        [employee_email, employee_id]
      );
    }

    // Update employee info
    await connection.query(
      `UPDATE employee_info 
       SET employee_first_name = ?, employee_last_name = ?, employee_phone = ?
       WHERE employee_id = ?`,
      [employee_first_name, employee_last_name, employee_phone, employee_id]
    );

    // Update password if provided
    if (employee_password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(employee_password, salt);

      await connection.query(
        "UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?",
        [hashedPassword, employee_id]
      );
    }

    await connection.commit();
    return { success: true, message: "Employee updated successfully" };
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Update employee error:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

// function fetch employee status
async function getEmployeeStats() {
  try {
    const rows = await conn.query(`
      SELECT 
             COUNT(*) AS total_employees, 
             SUM(active_employee) AS active_employees
      FROM employee
     
    `);

    // Mocking inactive employees as total - active (modify according to your real logic)
    const totalEmployees = rows.map((row) => row.total_employees);
    const activeEmployees = rows.map((row) => row.active_employees);
    const inactiveEmployees = totalEmployees.map(
      (total, index) => total - activeEmployees[index]
    );

    const data = {
      months: rows.map((row) => row.month),
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
    };
    // Return the data
    return data;
  } catch (error) {
    // Return an error
    return error;
  }
}
// create function to reset password
async function resetEmployeePassword(employeeId) {
  try {
    const query = `UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    const result = await conn.query(query, [hashedPassword, employeeId]);
    if (result.affectedRows === 0) {
      throw new Error("Failed to reset employee password");
    }

    return true; // Success
  } catch (error) {
    console.error("Service Error:", error.message);

    return false; // Fail
  }
}
//change password
async function changePassword(employeeId, newPassword) {
  try {
    const query = `UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?`;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const result = await conn.query(query, [hashedPassword, employeeId]);
    if (result.affectedRows === 0) {
      throw new Error("Failed to change employee password");
    }

    return true; // Success
  } catch (error) {
    console.error("Service Error:", error.message);
  }
}

module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  getEmployeeStats,
  resetEmployeePassword,
  changePassword,
};
