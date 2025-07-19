// Import the dotenv package
require("dotenv").config();

// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");

// Import the employee service
const employeeService = require("../services/employee.service");

// Function to verify the token and determine if it's for a customer or an employee
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
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

    // Identify user type from token
    if (decoded.employee_email) {
      req.employee_email = decoded.employee_email;
    } else if (decoded.customer_email) {
      req.customer_email = decoded.customer_email;
      req.user = {
        customer_id: decoded.customer_id,
        customer_email: decoded.customer_email,
      };
    } else {
      return res.status(403).send({
        status: "fail",
        message: "Invalid token payload: missing email.",
      });
    }

    next();
  });
};

// Middleware to check if user is an Admin (employee with role_id 3)
const isAdmin = async (req, res, next) => {
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

// Middleware to check if user is a Manager or Admin (role_id 2 or 3)
const isManager_or_Admin = async (req, res, next) => {
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

// Middleware to check if user is Admin or editing their own profile
const isAdmin_or_Self = async (req, res, next) => {
  try {
    const employee_email = req.employee_email;
    const employee = await employeeService.getEmployeeByEmail(employee_email);

    if (employee[0].company_role_id === 3) {
      return next();
    }

    const requestedEmployeeId = req.body.employee_id;

    if (
      requestedEmployeeId &&
      requestedEmployeeId === employee[0].employee_id
    ) {
      return next();
    }

    return res.status(403).send({
      status: "fail",
      error:
        "Not authorized! You can only edit your own profile unless you're an admin.",
    });
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error during authorization",
    });
  }
};

// Middleware to attach full employee info to req.user
const attachEmployeeInfo = async (req, res, next) => {
  try {
    const employee_email = req.employee_email;
    const employee = await employeeService.getEmployeeByEmail(employee_email);

    if (!employee || employee.length === 0) {
      return res.status(401).json({ message: "Employee not found" });
    }

    req.user = {
      ...employee[0],
      isAdmin: employee[0].company_role_id === 3,
      isManager: employee[0].company_role_id === 2,
    };
    next();
  } catch (error) {
    console.error("Attach employee info error:", error);
    return res.status(500).json({ message: "Failed to attach employee info" });
  }
};

const attachCustomerInfo = async (req, res, next) => {
  try {
    const customer_email = req.customer_email;

    if (!customer_email) {
      return res
        .status(403)
        .json({ message: "Customer email not found in token" });
    }

    const customer = await customerService.getCustomerByEmail(customer_email);

    if (!customer || customer.length === 0) {
      return res.status(401).json({ message: "Customer not found" });
    }

    req.user = {
      ...customer[0],
    };

    next();
  } catch (error) {
    console.error("Attach customer info error:", error);
    return res.status(500).json({ message: "Failed to attach customer info" });
  }
};
// ✅ New: Middleware to check if the token belongs to a customer
const isCustomer = (req, res, next) => {
  if (req.customer_email) {
    return next();
  }

  return res.status(403).send({
    status: "fail",
    error: "Access denied. Not a valid customer token.",
  });
};

// ✅ New: Middleware to check if the token belongs to an employee
const isEmployee = (req, res, next) => {
  if (req.employee_email) {
    return next();
  }

  return res.status(403).send({
    status: "fail",
    error: "Access denied. Not a valid employee token.",
  });
};

// Export all middleware
const authMiddleware = {
  verifyToken,
  isAdmin,
  isManager_or_Admin,
  isAdmin_or_Self,
  attachEmployeeInfo,
  isCustomer,
  isEmployee,
  attachCustomerInfo,
};

module.exports = authMiddleware;
