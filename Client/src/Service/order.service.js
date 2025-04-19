import axios from "../Axios/axios";

const requestOptions = (token) => ({
  headers: {
    "Content-Type": "application/json",
    "x-access-token": token,
  },
});

// Get all orders// order.service.js
const getAllOrders = async () => {
  try {
    const response = await axios.get("/orders");

    if (!response.data.success || !Array.isArray(response.data.data)) {
      throw new Error("Invalid data format received from server");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error(
      error.response?.data?.message || error.message || "Failed to fetch orders"
    );
  }
};

// Get order by ID
const getOrderById = async (id, token) => {
  try {
    console.log(id);
    const response = await axios.get(
      `/orders/${id}`,
      requestOptions(token)
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Create a new order
const createOrder = async (orderData, token) => {
  console.log(orderData, token);
  try {
    const response = await axios.post(
      "/order",
      orderData,
      requestOptions(token)
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Update order status
const updateOrderStatus = async (orderId, status, token) => {
  try {
    const response = await axios.put(
      `/orders/${orderId}/status`,
      { status },
      requestOptions(token)
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
const getOrdersByCustomerId = async (customerId, token) => {
  try {
    const response = await axios.get(
      `/orders/customer/${customerId}`,
      requestOptions(token)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by customer ID:", error);
    throw error;
  }
};

const orderService = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  getOrdersByCustomerId,
};

export default orderService;
