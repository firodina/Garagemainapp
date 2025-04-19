const bcrypt = require("bcrypt");
const employeeService = require("./employee.service");
const customerService = require("./customer.service");
// const { getCustomerByEmail } = require("./customer.service");

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



async function customerLogIn(customerData) {
  try {
    const { email, password } = customerData;
    let returnData = {}; // Object to be returned

    // Fetch customer by email
    const customer = await customerService.getCustomerByEmail(email);

    if (!customer) {
      return {
        status: "fail",
        message: "Customer does not exist",
        statusCode: 404, // Not Found
      };
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, customer.password_hash);

    if (!passwordMatch) {
      return {
        status: "fail",
        message: "Incorrect password",
        statusCode: 401, // Unauthorized
      };
    }

    // Login successful
    return {
      status: "success",
      data: {
        customer_id: customer.customer_id,
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        // Add other fields as needed
      },
      statusCode: 200, // OK
    };
  } catch (error) {
    console.error("Error during customer login:", error);
    return {
      status: "error",
      message: "An internal error occurred",
      statusCode: 500, // Internal Server Error
    };
  }
}



module.exports = { logIn 
  ,customerLogIn
};