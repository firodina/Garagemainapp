const orderService = require("../services/order.service");

// Create a new order
async function createOrder(req, res) {
  const orderData = req.body;
  console.log(orderData);

  // Validate incoming data
  if (!orderData.customer_id || !orderData.total_price) {
    return res
      .status(400)
      .json({ message: "Customer ID and Total Price are required." });
  }

  try {
    // Call the service to create the order
    const result = await orderService.createOrder(orderData);
    return res
      .status(201)
      .json({ message: "Order created successfully", order: result });
  } catch (error) {
    console.error("Error creating order:", error);
    return res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
}
// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving order", error: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await orderService.updateOrderStatus(id, status);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update status", error: err.message });
  }
};

const getOrdersByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const orders = await orderService.getOrdersByCustomerId(customerId);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByCustomerId,
};
