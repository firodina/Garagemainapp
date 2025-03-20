const bcrypt = require("bcrypt");
const conn = require("../config/db.config");

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
    
    // Insert the employee information, including the image path
    const query =
      "INSERT INTO employee (employee_email, active_employee, added_date, employee_image) VALUES (?, ?, NOW(), ?)";
    
    const rows = await conn.query(query, [row1[0], row1[1], row1[2]]); // row1[2] is the employee_image
    
    if (rows.affectedRows !== 1) {
      return false;
    }
    
    // Get the employee ID from the insert
    const employee_id = rows.insertId;

    // Insert data into related tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [employee_id, row2[0], row2[1], row2[2]]);
    
    if (rows2.affectedRows !== 1) {
      return false;
    }

    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    
    if (rows3.affectedRows !== 1) {
      return false;
    }

    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [employee_id, row3[0]]);
    
    if (rows4.affectedRows !== 1) {
      return false;
    } else {
      console.log("employee created");
      return true;
    }
  } catch (err) {
    console.error("Error creating employee:", err);
    return false; // Return false in case of errors
  }
}

//   // A function to get employee by email
  async function getEmployeeByEmail(employee_email) {
    const query =
      "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
    const rows = await conn.query(query, [employee_email]);
    return rows;
  }
  
//   async function getCustomerByEmail(customer_email) {
//     const query = "SELECT * FROM customer_identifier  WHERE customer_email = ?";
//     const rows = await conn.query(query, [customer_email]);
//     return rows;
//   }

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
  let hashedPassword = null;
  const {
    employee_id,
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_email,
    employee_password,
  } = updatedEmployeeData;

  // If a new password is provided, hash it
  if (employee_password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(employee_password, salt);
  }

  try {
    // Update employee email
    const query1 = `UPDATE employee SET employee_email = ? WHERE employee_id = ?`;
    const result1 = await conn.query(query1, [employee_email, employee_id]);

    if (result1.affectedRows === 0) {
      console.error("No employee found with employee_id:", employee_id);
      throw new Error("No employee found with the provided employee_id");
    }

    // Update employee info
    const query2 = `
            UPDATE employee_info 
            SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? 
            WHERE employee_id = ?`;
    const result2 = await conn.query(query2, [
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_id,
    ]);

    if (result2.affectedRows === 0) {
      console.error(
        "Failed to update employee info for employee_id:",
        employee_id
      );
      throw new Error("Failed to update employee info");
    }

    // Update employee password if provided
    if (hashedPassword) {
      const query3 = `UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?`;
      const result3 = await conn.query(query3, [hashedPassword, employee_id]);

      if (result3.affectedRows === 0) {
        console.error(
          "Failed to update employee password for employee_id:",
          employee_id
        );
        throw new Error("Failed to update employee password");
      }
    }

    return true; // Success
  } catch (error) {
    console.error("Service Error:", error.message);

    return false; // Fail
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
  
  

module.exports = {  checkIfEmployeeExists,
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