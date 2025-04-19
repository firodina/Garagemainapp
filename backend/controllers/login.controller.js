// Import the login service
const loginService = require("../services/login.service");

// Import the customer service
const customerService = require("../services/login.service");
// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");
// Import the secret key from the environment variables
const jwtSecret = process.env.SECRET_KEY;

// Handle employee login
async function logIn(req, res, next) {
  try {
    console.log(req.body);
    const employeeData = req.body;
    // Call the logIn method from the login service
    const employee = await loginService.logIn(employeeData);
    // If the employee is not found
    if (employee.status === "fail") {
      res.status(403).json({
        status: employee.status,
        message: employee.message,
      });
      console.log(employee.message);
    }
    // If successful, send a response to the client
    const payload = {
      employee_id: employee.data.employee_id,
      employee_email: employee.data.employee_email,
      employee_role: employee.data.company_role_id,
      employee_first_name: employee.data.employee_first_name,
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });
    // console.log(token);
    const sendBack = {
      employee_token: token,
    };
    res.status(200).json({
      status: "success",
      message: "Employee logged in successfully",
      data: sendBack,
    });
  } catch (error) {}
}

// Handle customer login
async function customerLogIn(req, res, next) {
  try {
    console.log(req.body);
    const customerData = req.body;
    // Call the customerLogin method from the customer service
    const customer = await customerService.customerLogIn(customerData);
    // If the customer is not found
    if (customer.status === "fail") {
      res.status(403).json({
        status: customer.status,
        message: customer.message,
      });
      console.log(customer.message);
      return; // Exit to avoid further processing
    }
    
    // If successful, send a response to the client
    const payload = {
      customer_id: customer.data.customer_id,
      customer_email: customer.data.email,
      customer_first_name: customer.data.first_name,
      customer_last_name: customer.data.last_name,
      // Include other necessary fields in the payload
    };
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });

    const sendBack = {
      customer_token: token,
    };
    res.status(200).json({
      status: "success",
      message: "Customer logged in successfully",
      data: sendBack,
    });
  } catch (error) {
    console.error("Error during customer login:", error);
    res.status(500).json({
      status: "error",
      message: "An internal error occurred",
    });
  }
}

// Export the logIn function
module.exports = { logIn,
  customerLogIn
 };