const express = require("express");
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deactivateService,
  getServicesByVehicleType,
  getServicesByOrderId,
  updateOrderServiceStatus,
} = require("../controllers/service.controller");

const authMiddleware = require("../middlewares/auth.middleware");
// Define the route to get all services
router.get(
  "/api/services",

  getAllServices
);

// Define the route to get a service by ID
router.get(
  "/api/services/:service_id",
  [authMiddleware.verifyToken],
  getServiceById
);

// Define the route to create a new service
router.post("/api/service", [authMiddleware.verifyToken], createService);

// Define the route to update a service
router.put(
  "/api/services/:service_id",
  // [authMiddleware.verifyToken],
  updateService
);

// Define the route to deactivate a service
router.delete(
  "/api/services/:service_id",
  [authMiddleware.verifyToken],
  deactivateService
);

router.get(
  "/api/services/type/:vehicleTypeId",

  getServicesByVehicleType
);

// Route to get services by order ID
router.get("/api/services/order/:orderId", getServicesByOrderId);
router.put("/api/update-status/:order_service_id", updateOrderServiceStatus);

module.exports = router;
