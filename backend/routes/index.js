// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install router
const installRouter = require("./install.routes");
// Import the employee router
const employeeRouter = require("./employee.routes");

// Add routes
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);

// Export the router correctly
module.exports = router;
