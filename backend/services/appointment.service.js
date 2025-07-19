const db = require("../config/db.config"); // Ensure this is the correct path

const { sendEmail, sendSMS } = require("./notification.service"); // Adjust to your actual file
const formatToE164 = (phone) => {
  return phone.startsWith("+") ? phone : "+251" + phone.slice(1);
};

const bookAppointment = async (
  customerId,
  serviceTypeId,
  vehicleTypeId,
  serviceDate,
  timeSlot
) => {
  try {
    // ✅ 1. Check if the customer already has an appointment at this date and time
    const conflictCheck = await db.query(
      `SELECT appointment_id FROM appointments 
       WHERE customer_id = ? AND service_date = ? AND time_slot = ?`,
      [customerId, serviceDate, timeSlot]
    );

    if (conflictCheck.length > 0) {
      return {
        success: false,
        message:
          "You already have an appointment at this time. Please choose a different time slot.",
      };
    }

    // ✅ 2. Check if the same service is already booked at this time (optional shared resource conflict)
    const serviceConflict = await db.query(
      `SELECT appointment_id FROM appointments 
       WHERE service_type_id = ? AND service_date = ? AND time_slot = ?`,
      [serviceTypeId, serviceDate, timeSlot]
    );

    if (serviceConflict.length > 0) {
      return {
        success: false,
        message:
          "This service is already booked at the selected time. Please choose a different time slot.",
      };
    }

    // ✅ 3. Book the appointment
    const query = `
      INSERT INTO appointments (customer_id, service_type_id, vehicle_type_id, service_date, time_slot, status)
      VALUES (?, ?, ?, ?, ?, 'Booked')
    `;
    const result = await db.query(query, [
      customerId,
      serviceTypeId,
      vehicleTypeId,
      serviceDate,
      timeSlot,
    ]);

    const insertId = result?.[0]?.insertId || result?.insertId;

    // ✅ 4. Notify the customer
    const [customerData] = await db.query(
      "SELECT email, phone FROM customer_identifier WHERE customer_id = ?",
      [customerId]
    );

    const customerEmail = customerData?.email;
    const customerPhone = customerData?.phone;

    if (!customerEmail || !customerPhone) {
      throw new Error("Customer email or phone not found");
    }

    const formattedPhone = formatToE164(customerPhone);
    const message = `Your appointment has been scheduled!\nDate: ${serviceDate}\nTime: ${timeSlot}`;
    const subject = "Appointment Confirmation";

    // Email Notification
    try {
      await sendEmail([customerEmail], message, subject);
      await db.query(
        `INSERT INTO appointment_notifications (appointment_id, message, status, type)
         VALUES (?, ?, 'Sent', 'Email')`,
        [insertId, message]
      );
    } catch (emailErr) {
      await db.query(
        `INSERT INTO appointment_notifications (appointment_id, message, status, type)
         VALUES (?, ?, 'Failed', 'Email')`,
        [insertId, message]
      );
      console.error("Email send failed:", emailErr.message);
    }

    // SMS Notification
    try {
      await sendSMS(formattedPhone, message);
      await db.query(
        `INSERT INTO appointment_notifications (appointment_id, message, status, type)
         VALUES (?, ?, 'Sent', 'SMS')`,
        [insertId, message]
      );
    } catch (smsErr) {
      await db.query(
        `INSERT INTO appointment_notifications (appointment_id, message, status, type)
         VALUES (?, ?, 'Failed', 'SMS')`,
        [insertId, message]
      );
      console.error("SMS send failed:", smsErr.message);
    }

    return {
      success: true,
      appointmentId: insertId,
      message: "Appointment booked successfully.",
    };
  } catch (err) {
    throw new Error("Error booking appointment: " + err.message);
  }
};

const getAllAppointments = async () => {
  try {
    const query = `
      SELECT 
        a.appointment_id,
        a.service_date,
        a.time_slot,
        a.status,
        c.first_name,
        c.last_name,
        v.vehicle_type_name,
        a.service_type_id, 
        s.service_name
      FROM appointments a
      JOIN customer_info c ON a.customer_id = c.customer_id
      JOIN vehicle_types v ON a.vehicle_type_id = v.vehicle_type_id
      JOIN service_types s ON a.service_type_id = s.service_type_id
    `;

    const results = await db.query(query);
    return { success: true, appointments: results || [] }; // Ensure it's an array
  } catch (err) {
    throw new Error("Error retrieving all appointments: " + err.message);
  }
};
// Function to get appointments by customer ID
const getAppointmentsByCustomerId = async (customerId) => {
  try {
    const query = `
      SELECT * FROM appointments
      WHERE customer_id = ?
    `;

    const results = await db.query(query, [customerId]);

    return results || []; // Return an empty array if no results
  } catch (err) {
    throw new Error("Error retrieving appointments: " + err.message);
  }
};

// Function to get an appointment by appointment ID
const getAppointmentById = async (appointmentId) => {
  try {
    const query = `
      SELECT * FROM appointments
      WHERE appointment_id = ?
    `;

    const results = await db.query(query, [appointmentId]);

    return results[0] || null; // Return the appointment or null if not found
  } catch (err) {
    throw new Error("Error retrieving appointment: " + err.message);
  }
};

// Export the functions to be used in other files
module.exports = {
  bookAppointment,
  getAllAppointments, // Export the new function
  getAppointmentsByCustomerId,
  getAppointmentById,
};
