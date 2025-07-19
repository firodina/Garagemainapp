const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

// Create new task
router.post("/api/task", taskController.createTask);

// Get all tasks
router.get("/api/tasks/", taskController.getAllTasks);

// Get a task by ID
router.get(
  "/api/tasks/:task_id",
  (req, res, next) => {
    console.log("Route hit:", req.params.task_id);
    next();
  },
  taskController.getTaskById
);

// Update a task
router.put("/api/tasks/:id", taskController.updateTask);

// Delete a task
router.delete("/api/tasks/:id", taskController.deleteTask);

// Get tasks by order ID
router.get(
  "/api/assigned-orders/:employeeId",
  taskController.getOrdersAssignedToEmployee
);

// Routes for updating service and completing task
router.put(
  "/api/updateservicecompleted",
  taskController.updateServiceCompleted
);
router.put(
  "/api/updatetaskcompleted/:orderId",
  taskController.updateTaskCompleted
);

router.get("/api/order-services/:orderId", taskController.getOrderServices);
router.get("/api/order-details/:orderId", taskController.getOrderDetails);
router.put(
  "/api/:orderId/services/:serviceId/status",
  taskController.updateServiceStatus
);
router.get(
  "/api/completed-tasks/:employeeId",
  taskController.getCompletedTasksByEmployee
);

module.exports = router;
