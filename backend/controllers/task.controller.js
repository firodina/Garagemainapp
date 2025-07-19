const taskService = require("../services/task.service");

const createTask = async (req, res) => {
  try {
    const taskData = {
      order_id: req.body.order_id ?? null, // convert undefined to null
      assigned_to: req.body.assigned_to,
      task_details: req.body.task_details,
      task_status: req.body.task_status ?? "Pending",
    };

    if (
      taskData.assigned_to === undefined ||
      taskData.task_details === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await taskService.createTask(taskData);

    res.status(201).json({
      message: "Task created successfully",
      task: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTaskById = async (req, res) => {
  const { task_id } = req.params;

  try {
    const task = await taskService.getTaskById(task_id);

    console.log("tasks", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;
    await taskService.updateTask(taskId, updatedData);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders assigned to a specific employee
// Controller to get orders based on employee's assigned tasks
const getOrdersAssignedToEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params; // Assuming you're passing employeeId as URL param

    if (!employeeId) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    const orders = await taskService.getOrdersByAssignedEmployee(employeeId);

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this employee" });
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

    if (!orderId || !servi - ceId || serviceCompleted === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await taskService.updateServiceCompleted(
      orderId,
      serviceId,
      serviceCompleted
    );

    res
      .status(200)
      .json({ message: "Service completion updated successfully" });
  } catch (error) {
    console.error("Error updating service completion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// task.controller.js
const updateTaskCompleted = async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await taskService.updateTaskCompleted(orderId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in updateTaskCompleted controller:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to complete task",
    });
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
  const { orderId } = req.params;

  try {
    const orderDetails = await taskService.getOrderDetails(orderId);

    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(orderDetails);
  } catch (error) {
    console.error("Error in getOrderDetails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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

// Controller to get completed tasks by employee ID
const getCompletedTasksByEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const completedTasks = await taskService.getCompletedTasksByEmployee(
      employeeId
    );

    // Always return 200 with array (even if empty)
    res.status(200).json(completedTasks);
  } catch (error) {
    console.error("Error retrieving completed tasks:", error);
    res.status(500).json({ message: "Error retrieving completed tasks." });
  }
};

module.exports = {
  deleteTask,
  updateTask,
  getTaskById,
  getAllTasks,
  createTask,
  getOrdersAssignedToEmployee,
  getOrderServices,
  getOrderDetails,
  updateServiceStatus,
  updateTaskCompleted,
  updateServiceCompleted,
  getCompletedTasksByEmployee,
};
