import axios from "../Axios/axios";

const getAllServices = async (token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.get("/services", requestOptions);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

const getServiceById = async (serviceId, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.get(
      `/services/${serviceId}`,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

const createService = async (serviceData, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.post(
      "/service",
      serviceData,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

const updateService = async (serviceId, serviceData, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.put(
      `/services/${serviceId}`,
      serviceData,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

const deactivateService = async (serviceId, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.delete(
      `/services/${serviceId}`,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating service:", error);
    throw error;
  }
};

const getServicesByVehicleType = async (vehicleTypeId, token) => {
  // Check if vehicleTypeId is valid
  // console.log(vehicleTypeId);
  if (!vehicleTypeId) {
    console.error("Invalid vehicleTypeId:", vehicleTypeId);
    throw new Error("Invalid vehicleTypeId provided");
  }

  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.get(
      `/services/type/${vehicleTypeId}`,
      requestOptions
    );


    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching services by vehicle type:", error);
    throw error;
  }
};
const getServiceByOrderId = async (orderId, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.get(
      `/services/order/${orderId}`,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching services by order ID:", error);
    throw error;
  }
};
// In service.service.js
const updateServiceStatus = async (orderServiceId, status, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    // ✅ Add console log to help debug
    console.log("Updating Service:", { orderServiceId, status });

    if (orderServiceId === undefined || status === undefined) {
      console.error("Missing required parameters:", { orderServiceId, status });
      throw new Error("orderServiceId and status are required");
    }

    const response = await axios.put(
      "/services/update-status",
      { orderServiceId, status },
      requestOptions
    );

    return response.data;
  } catch (error) {
    console.error("Error in updateServiceStatus:", error);
    throw error;
  }
};



const serviceService = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deactivateService,
  getServicesByVehicleType,
  getServiceByOrderId,
  updateServiceStatus,
};

export default serviceService;
