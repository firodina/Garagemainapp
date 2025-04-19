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
  updateServiceStatus,

} = require("../controllers/service.controller");

// Define the route to get all services
router.get("/api/services", getAllServices);

// Define the route to get a service by ID
router.get("/api/services/:service_id", getServiceById);

// Define the route to create a new service
router.post("/api/service", createService);

// Define the route to update a service
router.put("/api/services/:service_id", updateService);

// Define the route to deactivate a service
router.delete("/api/services/:service_id", deactivateService);

router.get("api/services/type/:vehicleTypeId", getServicesByVehicleType);

// Route to get services by order ID
router.get("/api/services/order/:orderId", getServicesByOrderId);

router.put("/api/services/update-status", updateServiceStatus);
module.exports = router;
