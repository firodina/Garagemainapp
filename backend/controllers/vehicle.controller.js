const vehicleService = require("../services/vehicle.service");

// Controller to handle creating a vehicle type
const createVehicleType = async (req, res) => {
  const { vehicleTypeName } = req.body;

  console.log(vehicleTypeName);
  if (!vehicleTypeName) {
    return res.status(400).json({ message: "Vehicle type name is required." });
  }

  try {
    const vehicleTypeId = await vehicleService.createVehicleType(
      vehicleTypeName
    );
    return res.status(201).json({
      message: "Vehicle type created successfully",
      data: { vehicleTypeId },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create vehicle type",
      error: error.message,
    });
  }
};

// Add this to your existing vehicle.controller.js
// vehicleController.js
const getAllVehicleTypes = async (req, res) => {
  try {
    const vehicleTypes = await vehicleService.getAllVehicleTypes();
    console.log("Raw DB Data:", vehicleTypes); // Should now log an array

    // Force response to be an array (safety check)
    const response = Array.isArray(vehicleTypes)
      ? vehicleTypes
      : [vehicleTypes];
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle types" });
  }
};
async function createVehicle(req, res) {
  try {
    // Extract customer_id from URL parameters
    const { customer_id } = req.params; // customer_id is passed in the URL

    console.log(customer_id);

    // Extract other vehicle data from the request body
    const { vehicle_type_name, make, model, year, VIN } = req.body;

    // Validate required fields
    if (
      !customer_id ||
      !vehicle_type_name ||
      !make ||
      !model ||
      !year ||
      !VIN
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Call the service to create a vehicle, passing the customer_id with the vehicle data
    const vehicleCreated = await vehicleService.createVehicle({
      customer_id, // Pass customer_id here
      vehicle_type_name,
      make,
      model,
      year,
      VIN,
    });

    if (!vehicleCreated) {
      return res.status(400).json({ error: "Vehicle not created" });
    } else {
      return res.status(201).json({
        message: "Vehicle created successfully",
        success: true,
        vehicle: vehicleCreated,
      });
    }
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting all vehicles" });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const vehicle = await vehicleService.getVehicleById(vehicleId);
    if (!vehicle) {
      res.status(404).json({ message: "Vehicle not found" });
    } else {
      res.json(vehicle);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting vehicle" });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const vehicleData = req.body;

    // Check if all required properties are present
    const requiredProperties = [
      "vehicle_type_name",
      "make",
      "model",
      "year",
      "VIN",
    ];
    const updatedVehicle = await vehicleService.updateVehicle(
      vehicleId,
      vehicleData
    );
    res.json(updatedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating vehicle" });
  }
};
const deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;
    const response = await vehicleService.deleteVehicle(vehicleId);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting vehicle" });
  }
};

const getVehiclesByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  console.log(customerId);

  try {
    const vehicles = await vehicleService.getVehiclesByCustomerId(customerId);

    if (!vehicles || vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for this customer." });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching customer vehicles" });
  }
};

const updateVehicleType = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { vehicle_type_name } = req.body;
  console.log(vehicle_type_name);

  try {
    await vehicleService.updateVehicleType(id, vehicle_type_name);
    res.status(200).json({ message: "Vehicle type updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating vehicle type", error });
  }
};

// Delete vehicle type by ID
const deleteVehicleType = async (req, res) => {
  const { id } = req.params;

  try {
    await vehicleService.deleteVehicleType(id);
    res.status(200).json({ message: "Vehicle type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle type", error });
  }
};

module.exports = {
  createVehicleType,
  getAllVehicleTypes,
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehiclesByCustomerId,
  updateVehicleType,
  deleteVehicleType,
};
