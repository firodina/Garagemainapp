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
  
// A function to create a new employee
async function createEmployee(row1, row2, row3, employee_password) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee,added_date,employee_image) VALUES (?,?,NOW(),?)";
    const rows = await conn.query(query, [row1[0], row1[1], row1[2]]);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      row2[0],
      row2[1],
      row2[2],
    ]);
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
    // construct to the employee object to return
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
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
  
  

module.exports = {  checkIfEmployeeExists,
    createEmployee,
    getEmployeeByEmail, };