// Import the dotenv package
require("dotenv").config();
// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");
// A function to verify the token received from the frontend
// Import the employee service
const employeeService = require("../services/employee.service");

// Import customer service
const customerService = require("../services/customer.service");

// A function to verify the token received from the frontend
const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      status: "fail",
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: "fail",
        message: "Unauthorized!",
      });
    }
    // console.log("Here is the decoded token");
    // console.log(decoded);
    req.employee_email = decoded.employee_email;
    next();
  });
};

// A function to check if the user is an admin
const isAdmin = async (req, res, next) => {
  // let token = req.headers["x-access-token"];
  console.log(req.employee_email);
  const employee_email = req.employee_email;
  const employee = await employeeService.getEmployeeByEmail(employee_email);
  if (employee[0].company_role_id === 3) {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      error: "Not an Admin!",
    });
  }
};
// A function to check if the user is an admin
const isManager_or_Admin = async (req, res, next) => {
  // let token = req.headers["x-access-token"];
  console.log(req.employee_email);
  const employee_email = req.employee_email;
  const employee = await employeeService.getEmployeeByEmail(employee_email);
  if (employee[0].company_role_id === 2 || employee[0].company_role_id === 3) {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      error: "Not a Manager!",
    });
  }
};


// Customer token verification
const verifyCustomerToken = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "No token provided!"
    });
  }

  // Remove 'Bearer ' prefix if present
  token = token.replace(/^Bearer\s+/, "");

  jwt.verify(token, process.env.CUSTOMER_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized!"
      });
    }
    req.customer_id = decoded.customer_id;
    next();
  });
};

// Check if customer owns the account
const isOwnCustomer = async (req, res, next) => {
  const requestedCustomerId = req.params.customer_id || req.params.id;
  
  if (req.customer_id.toString() === requestedCustomerId.toString()) {
    next();
  } else {
    return res.status(403).json({
      status: "fail",
      message: "Not authorized to access this customer's data"
    });
  }
};

// Update your exports
const authMiddleware = {
  verifyToken,
  isAdmin,
  isManager_or_Admin,
  verifyCustomerToken,
  isOwnCustomer
};


module.exports = authMiddleware;
