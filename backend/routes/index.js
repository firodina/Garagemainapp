// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install router
const installRouter = require("./install.routes");
// Import the employee router
const employeeRouter = require("./employee.routes");

// Import the login routes
const loginRoutes = require("./login.routes");

// Add routes
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);

// Export the router correctly
module.exports = router;
