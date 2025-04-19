const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");
// import auth middleware
const {
  verifyToken,
  isManagerOrAdmin,

  isCustomer,
} = require("../middlewares/auth.middleware");

router.post(
  "/api/vehicletype",
  // verifyToken,
  // isManagerOrAdmin,
  vehicleController.createVehicleType
);

// Add this to your existing vehicle.routes.js
router.get(
  "/api/vehicletypes",
  // verifyToken, // Uncomment if you want to add authentication
  vehicleController.getAllVehicleTypes
);

router.post(
  "/api/vehicles/:customer_id",
  // [verifyToken, isManagerOrAdmin],
  vehicleController.createVehicle
);

// Route to get all vehicles
router.get("/api/vehicles", vehicleController.getAllVehicles);

// Route to get a vehicle by ID
router.get("/api/vehicles/:vehicleId", vehicleController.getVehicleById);

// Route to update a vehicle
router.put("/api/vehicles/:vehicleId", vehicleController.updateVehicle);

// Route to delete a vehicle
router.delete("/api/vehicles/:vehicleId", vehicleController.deleteVehicle);

router.get(
  "/api/customer/:customerId/vehicles",
  vehicleController.getVehiclesByCustomerId
);
// Update vehicle type
router.put("/api/vehicle-types/:id", vehicleController.updateVehicleType);

// Delete vehicle type
router.delete("/api/vehicle-types/:id", vehicleController.deleteVehicleType);

module.exports = router;
