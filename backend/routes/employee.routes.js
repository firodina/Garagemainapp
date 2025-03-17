const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const employeeController = require("../controllers/employee.controller");

// Create a new employee
router.post("/api/employee", employeeController.createEmployee);
//import auth middleware from middlewares folder
const authMiddleware = require("../middlewares/auth.middleware");

//import path module
const path = require("path");

//import multer middleware from middlewares folder
const upload = require("../config/multer.config");

// Create a route to handle the get all employees request on get
router.get(
    "/api/employees",
    [authMiddleware.verifyToken, authMiddleware.isManager_or_Admin],
    upload.single("employee_image"),
    employeeController.getAllEmployees
  );
  // Create a route to handle the update employee request on put
  router.put(
    "/api/employee",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    employeeController.updateEmployee
  );
  
  //get employee by id
  router.get(
    "/api/employee/:employeeId",
    // authMiddleware.verifyToken,
    employeeController.getEmployeeById
  );
  //delete employee
  router.delete(
    "/api/employee/:employeeId",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    employeeController.deleteEmployee
  );
  //route to reset password
  router.put(
    "/api/employee/password/:employeeId",
    [authMiddleware.verifyToken, authMiddleware.isAdmin],
    employeeController.resetEmployeePassword
  );
  
  //password change
  router.put(
    "/api/user/password/:employeeId",
    // [authMiddleware.verifyToken, authMiddleware.isAdmin],
    employeeController.changePassword
  );
  // router employee stats data
  router.get("/api/employees/stats", employeeController.getEmployeeStats);
  
// Export the router
module.exports = router;