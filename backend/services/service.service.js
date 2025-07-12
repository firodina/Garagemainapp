const conn = require("../config/db.config");

async function getAllServices() {
  const query = `
    SELECT 
      st.service_type_id,
      st.service_name,
      st.description,
      st.duration,             
      sp.price,
      vt.vehicle_type_name 
    FROM 
      service_types st 
    LEFT JOIN 
      service_pricing sp ON st.service_type_id = sp.service_type_id 
    LEFT JOIN 
      vehicle_types vt ON sp.vehicle_type_id = vt.vehicle_type_id
  `;
  const rows = await conn.query(query);
  return rows;
}
async function getServiceById(serviceId) {
  const query =
    "SELECT st.*, sp.price, vt.vehicle_type_name FROM service_types st LEFT JOIN service_pricing sp ON st.service_type_id = sp.service_type_id LEFT JOIN vehicle_types vt ON sp.vehicle_type_id = vt.vehicle_type_id WHERE st.service_type_id = ?";
  const rows = await conn.query(query, [serviceId]);
  return rows;
}

async function createService(serviceData) {
  const { service_name, description, price, vehicle_type_name, duration } = serviceData; // Include duration

  // Retrieve the vehicle type ID from the vehicle_types table
  const vehicleTypeQuery =
    "SELECT vehicle_type_id FROM vehicle_types WHERE vehicle_type_name = ?";
  const vehicleTypeResult = await conn.query(vehicleTypeQuery, [
    vehicle_type_name,
  ]);
  const vehicleTypeId = vehicleTypeResult[0].vehicle_type_id;

  // Check if a service with the same name and description already exists
  const existingServiceQuery =
    "SELECT * FROM service_types WHERE service_name = ? AND description = ?";
  const existingServiceResult = await conn.query(existingServiceQuery, [
    service_name,
    description,
  ]);

  if (existingServiceResult.length > 0) {
    // Check if a pricing record already exists for the same service type and vehicle type combination
    const existingPricingQuery =
      "SELECT * FROM service_pricing WHERE service_type_id = ? AND vehicle_type_id = ?";
    const existingPricingResult = await conn.query(existingPricingQuery, [
      existingServiceResult[0].service_type_id,
      vehicleTypeId,
    ]);

    if (existingPricingResult.length > 0) {
      // Update the existing pricing record
      const updatePricingQuery =
        "UPDATE service_pricing SET price = ? WHERE service_type_id = ? AND vehicle_type_id = ?";
      await conn.query(updatePricingQuery, [
        price,
        existingServiceResult[0].service_type_id,
        vehicleTypeId,
      ]);
      return existingServiceResult[0].service_type_id;
    } else {
      // Create a new pricing record
      const createPricingQuery =
        "INSERT INTO service_pricing (service_type_id, vehicle_type_id, price) VALUES (?, ?, ?)";
      await conn.query(createPricingQuery, [
        existingServiceResult[0].service_type_id,
        vehicleTypeId,
        price,
      ]);
      return existingServiceResult[0].service_type_id;
    }
  } else {
    // Create a new service and pricing record
    const query1 =
      "INSERT INTO service_types (service_name, description, duration) VALUES (?, ?, ?)"; // Include duration
    const query2 =
      "INSERT INTO service_pricing (service_type_id, vehicle_type_id, price) VALUES (?, ?, ?)";

    try {
      const result1 = await conn.query(query1, [service_name, description, duration]); // Pass duration
      const serviceTypeId = result1.insertId;

      await conn.query(query2, [
        serviceTypeId,
        vehicleTypeId,
        price,
      ]);
      return serviceTypeId;
    } catch (error) {
      throw error;
    }
  }
}
async function updateService(serviceId, serviceData) {
  const { service_name, description, price, vehicle_type_name } = serviceData;

  const query1 =
    "UPDATE service_types SET service_name = ?, description = ? WHERE service_type_id = ?";
  const query2 =
    "UPDATE service_pricing sp INNER JOIN vehicle_types vt ON sp.vehicle_type_id = vt.vehicle_type_id SET sp.price = ? WHERE sp.service_type_id = ? AND vt.vehicle_type_name = ?";

  try {
    const result1 = await conn.query(query1, [
      service_name,
      description,
      serviceId,
    ]);
    const result2 = await conn.query(query2, [
      price,
      serviceId,
      vehicle_type_name,
    ]);
    return result1.affectedRows === 1 && result2.affectedRows === 1;
  } catch (error) {
    throw error;
  }
}

async function deactivateService(serviceId) {
  // Note: There is no 'active' column in the schema, so we cannot deactivate a service.
  // Instead, we can delete the service and its pricing.
  const query1 = "DELETE FROM service_pricing WHERE service_type_id = ?";
  const query2 = "DELETE FROM order_services WHERE service_type_id = ?";
  const query3 = "DELETE FROM service_types WHERE service_type_id = ?";

  try {
    const result1 = await conn.query(query1, [serviceId]);
    const result2 = await conn.query(query2, [serviceId]);
    const result3 = await conn.query(query3, [serviceId]);
    if (
      result1.affectedRows === 1 &&
      result2.affectedRows === 1 &&
      result3.affectedRows === 1
    ) {
      return { success: true, message: "Service deleted successfully" };
    } else {
      return { success: false, message: "Error deleting service" };
    }
  } catch (error) {
    throw error;
  }
}

const getServicesByVehicleType = async (vehicleTypeId) => {
  const query = `
    SELECT 
      sp.service_pricing_id,
      st.service_type_id,
      st.service_name,
      st.description,
      sp.price
    FROM 
      service_pricing sp
    JOIN 
      service_types st ON sp.service_type_id = st.service_type_id
    WHERE 
      sp.vehicle_type_id = ?
  `;

  console.log(query);
  const rows = await conn.query(query, [vehicleTypeId]);
  console.log(rows);
  return rows;
};

async function getServicesByOrderId(orderId) {
  const query = `
    SELECT 
      os.order_service_id,
      os.order_id,
      st.service_type_id,
      st.service_name,
      st.description,
      sp.price,
      vt.vehicle_type_name,
    os.service_status
    FROM 
      order_services os
    JOIN 
      service_types st ON os.service_type_id = st.service_type_id
    LEFT JOIN 
      service_pricing sp ON st.service_type_id = sp.service_type_id
    LEFT JOIN 
      vehicle_types vt ON sp.vehicle_type_id = vt.vehicle_type_id
    WHERE 
      os.order_id = ?
  `;

  const rows = await conn.query(query, [orderId]);
  return rows;
}

const updateServiceStatus = async (orderServiceId, status) => {
  console.log("Service Layer Params:", { orderServiceId, status });

  if (orderServiceId === undefined || status === undefined) {
    throw new Error("orderServiceId or status is undefined before DB query");
  }

  const insertStatusSql = `
    INSERT INTO service_status_updates (order_service_id, status)
    VALUES (?, ?)
  `;
  await conn.query(insertStatusSql, [orderServiceId, status]);

  let newServiceStatus = "In Progress";
  if (status === "Completed") {
    newServiceStatus = "Completed";
  }

  const updateServiceSql = `
    UPDATE order_services
    SET service_status = ?
    WHERE order_service_id = ?
  `;
  await conn.query(updateServiceSql, [newServiceStatus, orderServiceId]);

  // Now fetch the updated service row:
  const selectUpdatedServiceSql = `
    SELECT * FROM order_services WHERE order_service_id = ?
  `;
  const [rows] = await conn.query(selectUpdatedServiceSql, [orderServiceId]);

  if (rows.length === 0) {
    throw new Error("Updated service not found");
  }

  console.log(rows);
  return rows; // Return the updated service data
};







module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deactivateService,
  getServicesByVehicleType,
  getServicesByOrderId,
  updateServiceStatus,
};
