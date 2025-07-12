const db = require("../config/db.config"); // Assuming you have a database connection file

// Service function to book an appointment
const bookAppointment = async (customerId, serviceDate, timeSlot) => {
  try {
    const query = `
      INSERT INTO appointments (customer_id, service_date, time_slot, status)
      VALUES (?, ?, ?, 'Booked')
    `;
    const [result] = await db.execute(query, [
      customerId,
      serviceDate,
      timeSlot,
    ]);
    return result.insertId;
  } catch (err) {
    throw new Error("Error booking appointment: " + err.message);
  }
};

// Service function to create a notification
const createAppointmentNotification = async (appointmentId, message) => {
  try {
    const query = `
      INSERT INTO appointment_notifications (appointment_id, message)
      VALUES (?, ?)
    `;
    await db.execute(query, [appointmentId, message]);
  } catch (err) {
    throw new Error("Error creating appointment notification: " + err.message);
  }
};
const getCustomerAppointments = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const appointments = await appointmentService.getAppointmentsByCustomerId(
      customerId
    );
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while fetching appointments: " + err.message,
    });
  }
};
module.exports = {
  bookAppointment,
  createAppointmentNotification,
  getCustomerAppointments,
};
