const conn = require("../config/db.config");

// Function to create a new vehicle type
const createVehicleType = async (vehicleTypeName) => {
  const query = "INSERT INTO vehicle_types (vehicle_type_name) VALUES (?)";
  try {
    const result = await conn.query(query, [vehicleTypeName]);

    return result.insertId; // Returns the ID of the newly created vehicle type
  } catch (error) {
    throw new Error("Error creating vehicle type: " + error.message);
  }
};

// Add this to your existing vehicle.service.js
// vehicle.service.js (backend)
// vehicleService.js
const getAllVehicleTypes = async () => {
  const query = "SELECT * FROM vehicle_types ORDER BY vehicle_type_name";
  try {
    const rows = await conn.query(query); 
    console.log("SQL Results (All Vehicles):", rows); // Debug log
    return rows; // Returns ALL vehicle types
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
};
async function createVehicle(vehicle) {
  try {
    // Extract customer_id from the passed vehicle object
    const customerId = vehicle.customer_id;

    if (!customerId) {
      throw new Error("Customer ID is missing");
    }

    // Check if the vehicle type exists
    const typeCheckQuery = `
      SELECT vehicle_type_id FROM vehicle_types WHERE vehicle_type_name = ?`;
    const [typeResult] = await conn.query(typeCheckQuery, [
      vehicle.vehicle_type_name,
    ]);

    console.log("typeResult:", typeResult); // Log the query result to debug

    // Check if the query returned a valid object with vehicle_type_id
    if (!typeResult || !typeResult.vehicle_type_id) {
      throw new Error(
        `Invalid vehicle type: ${vehicle.vehicle_type_name}. Please use a predefined type.`
      );
    }

    // Access the vehicle_type_id from the result object
    const vehicleTypeId = typeResult.vehicle_type_id; // Access directly from the object
    console.log("Vehicle type ID:", vehicleTypeId);

    // Insert vehicle into the database
    const query = `
      INSERT INTO vehicles 
      (customer_id, vehicle_type_id, make, model, year, VIN) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await conn.query(query, [
      customerId, // Use customerId passed in the vehicle object
      vehicleTypeId, // Use vehicleTypeId from the query result
      vehicle.make,
      vehicle.model,
      vehicle.year,
      vehicle.VIN,
    ]);

    // Check if insertion was successful
    if (result.affectedRows === 1) {
      return { vehicle_id: result.insertId, customer_id: customerId };
    } else {
      throw new Error("Failed to insert vehicle");
    }
  } catch (error) {
    console.error("Error creating vehicle:", error.message);
    throw error; // Rethrow the error for further handling
  }
}
const getAllVehicles = async () => {
  const query = `
    SELECT v.vehicle_id, v.customer_id, vt.vehicle_type_name, v.make, v.model, v.year, v.VIN
    FROM vehicles v
    JOIN vehicle_types vt ON v.vehicle_type_id = vt.vehicle_type_id
  `;
  const results = await conn.query(query);
  return results;
};

const getVehicleById = async (vehicleId) => {
  const query = `
    SELECT v.vehicle_id, v.customer_id, vt.vehicle_type_name, v.make, v.model, v.year, v.VIN
    FROM vehicles v
    JOIN vehicle_types vt ON v.vehicle_type_id = vt.vehicle_type_id
    WHERE v.vehicle_id = ?
  `;
  const [results] = await conn.query(query, [vehicleId]);
  return results;
};

const updateVehicle = async (vehicleId, vehicleData) => {
  // Retrieve the vehicle_type_id from the database using the vehicle_type_name
  const query1 = `
    SELECT vehicle_type_id
    FROM vehicle_types
    WHERE vehicle_type_name = ?
  `;
  const [result1] = await conn.query(query1, [vehicleData.vehicle_type_name]);
  console.log("result1:", result1);
  const vehicleTypeId = result1.vehicle_type_id;

  // Retrieve the customer_id from the database using the vehicle_id
  const query2 = `
    SELECT customer_id
    FROM vehicles
    WHERE vehicle_id = ?
  `;
  const [result2] = await conn.query(query2, [vehicleId]);
  console.log("result2:", result2);
  const customerId = result2.customer_id;

  // Validate required properties
  const requiredProperties = ["make", "model", "year", "VIN"];
  if (
    !requiredProperties.every((prop) =>
      Object.prototype.hasOwnProperty.call(vehicleData, prop)
    )
  ) {
    throw new Error("Missing required properties in vehicleData");
  }

  // Update the vehicle
  const query3 = `
    UPDATE vehicles
    SET customer_id = ?, vehicle_type_id = ?, make = ?, model = ?, year = ?, VIN = ?
    WHERE vehicle_id = ?
  `;
  await conn.query(query3, [
    customerId,
    vehicleTypeId,
    vehicleData.make,
    vehicleData.model,
    vehicleData.year,
    vehicleData.VIN,
    vehicleId,
  ]);
  const query4 = `
      SELECT *
      FROM vehicles
      WHERE vehicle_id = ?
    `;
  const [result4] = await conn.query(query4, [vehicleId]);

  return result4;
};

const deleteVehicle = async (vehicleId) => {
  try {
    const query = `
      DELETE FROM vehicles
      WHERE vehicle_id = ?
    `;
    await conn.query(query, [vehicleId]);
    return { message: "Vehicle deleted successfully" };
  } catch (error) {
    throw error;
  }
};

const getVehiclesByCustomerId = async (customerId) => {
  const query = `
    SELECT v.vehicle_id, v.make, v.model, v.year, v.VIN, vt.vehicle_type_name AS type
    FROM vehicles v
    JOIN vehicle_types vt ON v.vehicle_type_id = vt.vehicle_type_id
    WHERE v.customer_id = ?
  `;

  try {
    const rows = await conn.query(query, [customerId]);
    // console.log(rows,customerId);
    return rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Error fetching vehicles by customer ID");
  }
};
const updateVehicleType = async (id, name) => {
  console.log(id, name);
  const result = await conn.query(
    "UPDATE vehicle_types SET vehicle_type_name = ? WHERE vehicle_type_id = ?",
    [name, id]

   
  );
   
  return result;
};

const deleteVehicleType = async (id) => {
  console.log(id);
  const result = await conn.query(
    "DELETE FROM vehicle_types WHERE vehicle_type_id = ?",
    [id]
  );
  return result;
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
