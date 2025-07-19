const express = require("express");
const router = express.Router();
const {
  getCustomerById,
  updateCustomer,
  getCustomerByEmail,
  addCustomer,
  getAllCustomers,
  deleteCustomer,
  getCustomerStatus,
  getNonApprovedCustomers,
  approveCustomer,
  unapproveCustomer,
  publicCustomerSignUp,
  // updatePassword,
  changePassword,
} = require("../controllers/customer.controller");
const {
  verifyToken,
  attachEmployeeInfo,
} = require("../middlewares/auth.middleware");

// Define the route to create a new customer
router.post("/api/customer", verifyToken, attachEmployeeInfo, addCustomer);
router.post("/api/customers", publicCustomerSignUp);

// Get all customers (Admin, Employee, and Customer can access)
router.get(
  "/api/customers",
  // verifyToken, isManagerOrAdmin,
  getAllCustomers
);

// Get customer details by ID (Admin, Employee, and Customer can access)
router.get(
  "/api/customer/:customer_id",
  // verifyToken,
  // isManagerOrAdmin,
  // isOwnCustomer,
  getCustomerById
);

// Update customer details (only the customer can update their own details)
router.put(
  "/api/customer/:id",
  // verifyToken,
  updateCustomer
);

// Define the route to get a customer by email
router.get(
  "/api/customer/email/:email",
  // verifyToken,
  getCustomerByEmail
);

// Define the route to delete a customer by ID
router.delete("/api/customer/:id", verifyToken, deleteCustomer);

router.get("/api/customers/status", getCustomerStatus);
router.get("/api/customers/non-approved", getNonApprovedCustomers);

router.put("/api/customers/approve/:customerId", approveCustomer);

// Route to unapprove a customer
router.put("/:id/unapprove", unapproveCustomer);

// Route to change password
router.put("/api/customer/password/:customerId", changePassword);
module.exports = router;
