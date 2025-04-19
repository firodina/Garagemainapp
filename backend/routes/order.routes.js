const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Routes
router.post("/api/order", orderController.createOrder);
router.get("/api/orders", orderController.getAllOrders);
router.get("/api/orders/:id", orderController.getOrderById);
router.put("/api/orders/:id/status", orderController.updateOrderStatus);
router.get("/customer/:customerId", orderController.getOrdersByCustomerId);


module.exports = router;
