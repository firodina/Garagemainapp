import axios from "../Axios/axios";

const requestOptions = (token) => ({
  headers: {
    "Content-Type": "application/json",
    "x-access-token": token,
  },
});

// Get all orders
const getAllOrders = async (token) => {
  try {
    const response = await axios.get("/orders", requestOptions(token));
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Get order by ID
const getOrderById = async (orderId, token) => {
  try {
    const response = await axios.get(
      `/orders/${orderId}`,
      requestOptions(token)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Create a new order
const createOrder = async (orderData, token) => {
  try {
    const response = await axios.post(
      "/order",
      orderData,
      requestOptions(token)
    );
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
