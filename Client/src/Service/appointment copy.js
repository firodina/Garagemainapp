import axios from "../Axios/axios";

// Create header options with token
const getAuthHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    "x-access-token": token,
  },
});

// Create a new appointment
const createAppointment = async (appointmentData, token) => {
  try {
    const response = await axios.post("/appointments", appointmentData, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

const getAllAppointments = async (token) => {
  try {
    const response = await axios.get("/appointments", getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error; // Ensure errors bubble up
  }
};

// Get appointments by customer ID
const getAppointmentsByCustomerId = async (customerId, token) => {
  try {
    const response = await axios.get(`/appointments/customer/${customerId}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error retrieving appointments by customer ID:", error);
    throw error;
  }
};

// Get an appointment by appointment ID
const getAppointmentById = async (appointmentId, token) => {
  try {
    const response = await axios.get(`/appointments/${appointmentId}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error retrieving appointment by ID:", error);
    throw error;
  }
};








const appointmentService = {
  
  createAppointment,
  getAllAppointments,
  getAppointmentsByCustomerId,
  getAppointmentById,
  
};

export default appointmentService;
