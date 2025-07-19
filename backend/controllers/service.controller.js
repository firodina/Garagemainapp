const serviceService = require("../services/service.service");

async function getAllServices(req, res, next) {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getServiceById(req, res, next) {
  try {
    const serviceId = req.params.service_id;
    const service = await serviceService.getServiceById(serviceId);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createService(req, res, next) {
  try {
    const serviceData = req.body;
    const serviceId = await serviceService.createService(serviceData);
    res.status(201).json({ service_id: serviceId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateService(req, res, next) {
  try {
    const serviceId = req.params.service_id;
    const serviceData = req.body;
    const success = await serviceService.updateService(serviceId, serviceData);
    if (success) {
      res.status(200).json({ message: "Service updated successfully" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deactivateService(req, res, next) {
  try {
    const serviceId = req.params.service_id;
    const success = await serviceService.deactivateService(serviceId);
    if (success) {
      res.status(200).json({ message: "Service deactivated successfully" });
    } else {
      // Check if the error message indicates that the service was deleted successfully
      if (error.message.includes("deleted successfully")) {
        res.status(200).json({ message: "Service deactivated successfully" });
      } else {
        res.status(404).json({ message: "Service not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getServicesByVehicleType = async (req, res) => {
  const vehicleTypeId = req.params.vehicleTypeId;

  console.log(vehicleTypeId);

  try {
    const services = await serviceService.getServicesByVehicleType(
      vehicleTypeId
    );

    console.log(services);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
async function getServicesByOrderId(req, res) {
  const orderId = req.params.orderId;

  try {
    const services = await serviceService.getServicesByOrderId(orderId);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services by order ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateOrderServiceStatus = async (req, res) => {
  const { order_service_id } = req.params;
  console.log(order_service_id);

  const { service_status } = req.body;
  console.log(service_status);

  if (!["Pending", "In Progress", "Completed"].includes(service_status)) {
    return res.status(400).json({ message: "Invalid service status" });
  }

  try {
    const updatedService = await serviceService.updateServiceStatus(
      order_service_id,
      service_status
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Order service not found" });
    }

    console.log(updatedService);

    res.status(200).json({
      message: "Service status updated successfully",
      service: updatedService, // return updated service data
    });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deactivateService,
  getServicesByVehicleType,
  getServicesByOrderId,
  updateOrderServiceStatus,
};
