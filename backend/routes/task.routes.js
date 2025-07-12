// Routes for updating service and completing task
router.put("/api/updateservicecompleted", taskController.updateServiceCompleted);
router.put("/api/updatetaskcompleted/:orderId", taskController.updateTaskCompleted);

router.get("/api/order-services/:orderId", taskController.getOrderServices);
router.get("/api/order-details/:orderId", taskController.getOrderDetails);
router.put("/api/:orderId/services/:serviceId/status", taskController.updateServiceStatus);
// Get orders by assigned employee
router.get(
    "/api/assigned-orders/:employeeId",
    taskController.getOrdersAssignedToEmployee,
  
  );