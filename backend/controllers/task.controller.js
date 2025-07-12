// Controller to get orders based on employee's assigned tasks
const getOrdersAssignedToEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params; // Assuming you're passing employeeId as URL param

    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const orders = await taskService.getOrdersByAssignedEmployee(employeeId);

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this employee" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in getOrdersAssignedToEmployee:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ✅ Update a single service completion (toggle service completed/uncompleted)
const updateServiceCompleted = async (req, res) => {
  try {
    const { orderId, serviceId, serviceCompleted } = req.body;

    if (!orderId || !servi-ceId || serviceCompleted === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await taskService.updateServiceCompleted(orderId, serviceId, serviceCompleted);

    res.status(200).json({ message: "Service completion updated successfully" });
  } catch (error) {
    console.error("Error updating service completion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Mark the entire task/order as completed
const updateTaskCompleted = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    await taskService.updateTaskCompleted(orderId);

    res.status(200).json({ message: "Task marked as completed successfully" });
  } catch (error) {
    console.error("Error updating task completion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrderServices = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    const services = await taskService.getOrderServices(orderId);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching order services:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("Fetching details for order:", orderId); // Log the order ID
    
    const orderDetails = await taskService.getOrderDetails(orderId);
    
    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error in getOrderDetails:", error); // Detailed error logging
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};
/**
 * Update the status of a specific service in an order
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const updateServiceStatus = async (req, res) => {
  try {
    const { orderId, serviceId } = req.params;
    const { completed } = req.body;
    
    if (!orderId || !serviceId || completed === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await taskService.updateServiceStatus(orderId, serviceId, completed);
    res.status(200).json({ message: "Service status updated successfully" });
  } catch (error) {
    console.error("Error updating service status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};