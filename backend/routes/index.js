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

// Import the customer routes
const customerRouter = require("./customer.routes");

// Import the vehicle routes
const vehicleRouter = require("./vehicle.routes");

// Import the service routes
const serviceRouter = require("./service.routes");

// Import the order routes
const orderRouter = require("./order.routes");

// import the appointment routes
const appointmentRouter = require("./appointment.routes");



// Add routes
router.use(installRouter);
// Add the employee routes to the main router
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the customer routes to the main router   
router.use(customerRouter);
// Add the vehicle routes to the main router
router.use(vehicleRouter);

// Add the service routes to the main router
router.use(serviceRouter);

// Add the order routes to the main router
router.use(orderRouter);

// Add the appointment routes to the main router
router.use(appointmentRouter);

// Export the router correctly
module.exports = router;
