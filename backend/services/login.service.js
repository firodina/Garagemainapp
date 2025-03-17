const bcrypt = require("bcrypt");
const employeeService = require("./employee.service");

async function logIn(employeeData) {
  try {
    let returnData = {}; // Object to be returned
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );

    if (employee.length === 0) {
      return {
        status: "fail",
        message: "Employee does not exist",
        statusCode: 404, // Not Found
      };
    }

    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employee[0].employee_password_hashed
    );

    if (!passwordMatch) {
      return {
        status: "fail",
        message: "Incorrect password",
        statusCode: 401, // Unauthorized
      };
    }

    return {
      status: "success",
      data: employee[0],
      statusCode: 200, // OK
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An internal error occurred",
      statusCode: 500, // Internal Server Error
    };
  }
}

module.exports = { logIn };