const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");

// Define the POST route for booking appointments
router.post("/api/appointments", appointmentController.bookAppointment);

// Define the GET route for retrieving all appointments
router.get("/api/appointments", appointmentController.getAllAppointments);

// Define the GET route for retrieving appointments by customer ID
router.get("/api/appointments/customer/:customerId", appointmentController.getAppointmentsByCustomerId);

// Define the GET route for retrieving an appointment by appointment ID
router.get("/api/appointments/:appointmentId", appointmentController.getAppointmentById);

module.exports = router;
