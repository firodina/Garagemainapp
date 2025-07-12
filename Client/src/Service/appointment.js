import axios from "../Axios/axios";

// Create header options with token
const getAuthHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    "x-access-token": token,
  },
});

// Function to get all appointments
const getAllAppointments = async (token) => {
  try {
    const response = await axios.get("/appointments", getAuthHeaders(token));
    
    // Check if the response structure is as expected
    if (!response.data.success || !Array.isArray(response.data.data)) {
      throw new Error("Invalid data format received from server");
    }

    return response.data.data; // Return the list of appointments
  } catch (error) {
    console.error("Error fetching appointments:", error);
    
    // Throw a more descriptive error
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch appointments"
    );
  }
};




// Get appointment by ID
const getAppointmentById = async (id, token) => {
  try {
    const response = await axios.get(`/appointments/${id}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error;
  }
};

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

// Update appointment status
const updateAppointmentStatus = async (appointmentId, status, token) => {
  try {
    const response = await axios.put(
      `/appointments/${appointmentId}/status`,
      { status },
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};

// Get appointments by customer ID
const getAppointmentsByCustomerId = async (customerId, token) => {
  try {
    const response = await axios.get(`/appointments/customer/${customerId}`, getAuthHeaders(token));
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments by customer ID:", error);
    throw error;
  }
};

// // Get available services and vehicles
// const getAvailableServicesAndVehicles = async (token) => {
//   try {
//     const response = await axios.get("/appointments/services-and-vehicles", getAuthHeaders(token));
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching services and vehicles:", error);
//     throw error;
//   }
// };

const appointmentService = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
  getAppointmentsByCustomerId,
  // getAvailableServicesAndVehicles,
};

export default appointmentService;
