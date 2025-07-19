// Import the login service
const loginService = require("../services/login.service");
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

// A function handle customer login
async function CustomerlogIn(req, res, next) {
  try {
    const CustomerData = req.body;

    const customer = await loginService.logInCustomer(CustomerData);

    console.log(customer);
    if (customer.status === "fail") {
      console.log(customer.message);
      console.log(customer.status);
      return res.status(403).json({
        status: customer.status,
        message: customer.message,
      });
    }

    if (customer.data.approved === 0) {
      return res.status(403).json({
        status: "fail",
        message: "Account not approved",
      });
    }

    const payload = {
      customer_id: customer.data.customer_id,
      customer_email: customer.data.customer_email,
    };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });
    console.log(token);

    const sendBack = {
      employee_token: token,
      user_type: "customer",
    };

    console.log(sendBack);
    res.status(200).json({
      status: "success",
      message: "Customer logged in successfully",
      data: sendBack,
    });
  } catch (error) {
    console.log("Customer login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Export the logIn function
module.exports = { logIn, CustomerlogIn };
