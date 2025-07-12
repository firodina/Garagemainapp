const appointmentService = require("../services/appointment.service");

const bookAppointment = async (req, res) => {
  const { customerId, serviceDate, timeSlot, serviceTypeId, vehicleTypeId } = req.body;

  // ✅ 1. Input Validation
  if (!customerId || !serviceDate || !timeSlot || !serviceTypeId || !vehicleTypeId) {
    return res.status(400).json({
      success: false,
      error: "Customer ID, service date, time slot, service type, and vehicle type are required",
    });
  }

  try {
    // ✅ 2. Call Service Layer
    const result = await appointmentService.bookAppointment(
      customerId,
      serviceTypeId,
      vehicleTypeId,
      serviceDate,
      timeSlot
    );

    // ✅ 3. Send Success Response
    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointmentId: result.appointmentId, // assuming service returns an object
    });
  } catch (error) {
    // ✅ 4. Catch and Report Errors
    console.error("Booking error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to book appointment. Please try again later.",
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.getAllAppointments();
    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error retrieving all appointments:", error); // Log the error
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve appointments. Please try again later.",
    });
  }
};

module.exports = { getAllAppointments };
// Function to get all appointments by customer ID
const getAppointmentsByCustomerId = async (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    return res.status(400).json({
      success: false,
      error: "Customer ID is required",
    });
  }

  try {
    const appointments = await appointmentService.getAppointmentsByCustomerId(customerId);
    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error retrieving appointments:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve appointments. Please try again later.",
    });
  }
};

// Function to get an appointment by appointment ID
const getAppointmentById = async (req, res) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    return res.status(400).json({
      success: false,
      error: "Appointment ID is required",
    });
  }

  try {
    const appointment = await appointmentService.getAppointmentById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error("Error retrieving appointment:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve appointment. Please try again later.",
    });
  }
};


//export the function to be used in other files
module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentsByCustomerId,
  getAppointmentById,
};