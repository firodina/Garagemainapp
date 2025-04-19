import axios from "../Axios/axios";
// const api_url = "https://localhost/3000/api";

const createCustomer = async (formData, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    // Only send formData - the backend will check the token for admin status
    const response = await axios.post(
      "/customer", // Make sure this matches your backend route
      formData,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};
const getAllCustomers = async (token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.get(`/customers`, requestOptions);
    console.log(response.data);
    return response.data; // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

const updateCustomer = async (customerId, formData, token) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    // Send the PUT request with axios
    const response = await axios.put(
      `/customer/${customerId}`,
      formData,
      requestOptions
    );

    // Check if the response status is 204 (No Content)
    if (response.status === 204) {
      return {}; // No content to return
    }

    // Return the response data if it's successful
    return response.data;
  } catch (error) {
    // Handle Axios error
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to update customer."
      );
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received:", error.request);
      throw new Error("No response from server.");
    } else {
      // Something happened while setting up the request
      console.error("Error setting up the request:", error.message);
      throw new Error("Error in request setup.");
    }
  }
};




const getCustomerById = async (token, customer_id) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
console.log(customer_id);
  // Ensure the API URL is correct
  const response = await axios.get(
    `/customer/${customer_id}`,
    requestOptions
  );
  return response.data;
};

const deleteCustomer = async (token, customerId) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await axios.delete(
      `/customer/${customerId}`,
      requestOptions
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};



const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  getCustomerById,
  deleteCustomer,
};

export default customerService;
