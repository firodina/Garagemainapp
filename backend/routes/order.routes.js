const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Routes
router.post("/api/order", orderController.createOrder);
router.get("/api/orders", orderController.getAllOrders);
router.get("/api/orders/:id", orderController.getOrderById);
router.put("/api/orders/:id/status", orderController.updateOrderStatus);
router.get(
  "/api/orders/customer/:customerId",
  orderController.getOrdersByCustomerId
);
// router.get("/api/customer/:customerId", orderController.getOrdersByCustomerId);
// router.get("/api/customer/orders", orderController.getOrdersByCustomerId);

module.exports = router;
