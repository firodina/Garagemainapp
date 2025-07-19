const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/multer.config");

// Create a new employee with image upload
router.post(
  "/api/employee",
  upload.single("employee_image"),
  employeeController.createEmployee
);

// Get all employees - accessing this route may require an image upload to interact
router.get(
  "/api/employees",
  // [authMiddleware.verifyToken, authMiddleware.isManager_or_Admin],
  employeeController.getAllEmployees
);

// Update employee
router.put(
  "/api/employee",

  employeeController.updateEmployee
);

// Get employee by ID
router.get("/api/employee/:employeeId", employeeController.getEmployeeById);

// Delete employee
router.delete(
  "/api/employee/:employeeId",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployee
);

// Reset password
router.put(
  "/api/employee/password/:employeeId",
  // authMiddleware.verifyToken,
  employeeController.resetEmployeePassword
);

// Change password
router.put(
  "/api/user/password/:employeeId",
  //   authMiddleware.verifyToken,
  employeeController.changePassword
);

// Get employee stats
router.get("/api/employees/stats", employeeController.getEmployeeStats);

// Export the router
module.exports = router;
