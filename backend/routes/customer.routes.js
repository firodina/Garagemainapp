const express = require("express");
const router = express.Router();
const {
  getCustomerById,
  updateCustomer,
  getCustomerByEmail,
  addCustomer,
  getAllCustomers,
  deleteCustomer,
  getCustomerStatus
} = require("../controllers/customer.controller");
const {
  verifyToken,
  isManagerOrAdmin,
  isOwnCustomer,
} = require("../middlewares/auth.middleware");

// Define the route to create a new customer
router.post("/api/customer", addCustomer);

// Get all customers (Admin, Employee, and Customer can access)
router.get("/api/customers",
  // verifyToken, isManagerOrAdmin,
  getAllCustomers);

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
router.delete(
  "/api/customer/:id",
  verifyToken,
  deleteCustomer
);

router.get("/api/customers/status", getCustomerStatus);

module.exports = router;

