const bcrypt = require("bcrypt");
const employeeService = require("./employee.service");
const customerService = require("./customer.service");

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
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "An internal error occurred",
      statusCode: 500,
    };
  }
}

async function logInCustomer(CustomerData) {
  try {
    let returnData = {};

    const Customer = await customerService.getCustomerByEmail(
      CustomerData.customer_email
    );

    if (!Customer) {
      returnData = {
        status: "fail",
        message: "Customer does not exist",
      };
      return returnData;
    }

    if (Customer.approved !== 1) {
      returnData = {
        status: "fail",
        message:
          "Your account is not approved yet. Please wait for admin approval.",
      };
      return returnData;
    }

    if (!CustomerData.customer_password || !Customer.password_hash) {
      returnData = {
        status: "fail",
        message: "Missing password data",
      };
      return returnData;
    }

    const passwordMatch = await bcrypt.compare(
      CustomerData.customer_password,
      Customer.password_hash
    );

    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnData;
    }

    returnData = {
      status: "success",
      data: Customer,
    };
    return returnData;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
}

module.exports = { logIn, logInCustomer };
