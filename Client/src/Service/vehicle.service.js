import axios from "../Axios/axios"; // Use your configured Axios instance

// Vehicle Types
const getAllVehicleTypes = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.get("/vehicletypes", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle types:", error);
    throw error;
  }
};

const createVehicleType = async (vehicleTypeName, token) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.post(
      "/vehicletype",
      { vehicleTypeName },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle type:", error);
    throw error;
  }
};

// Vehicles


const createVehicle = async (customerId, vehicleData, token) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.post(
      `/vehicles/${customerId}`,
      vehicleData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};


const getAllVehicles = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.get("/vehicles", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

const getVehicleById = async (vehicleId, token) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.get(`/vehicles/${vehicleId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

// Update these methods in your vehicle service
const updateVehicle = async (vehicleId, vehicleData, token) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.put(`/api/vehicles/${vehicleId}`, vehicleData, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

const deleteVehicle = async (vehicleId, token) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.delete(`/api/vehicles/${vehicleId}`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  };
};
const getVehiclesByCustomerId = async (token, customerId) => {
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };

  try {
    const response = await axios.get(
      `/customer/${customerId}/vehicles`,
      { headers }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching customer vehicles:", error);
    throw error;
  }
};
// Export all vehicle functions as a service
const vehicleService = {
  getAllVehicleTypes,
  createVehicleType,
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehiclesByCustomerId,
};

export default vehicleService;
