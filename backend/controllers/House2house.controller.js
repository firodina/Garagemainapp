const { validationResult } = require('express-validator');
const { insertVehicle, insertHouseServiceRequest } = require('../services/house2house.service');
const houseService = require('../services/house2house.service');

const createHouseServiceRequest = async (req, res) => {
  // Validate the incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    customer_id,
    vehicle_type_id,
    service_type_id,
    make,
    model,
    vin,
    address,
    latitude,
    longitude,
    preferred_date,
    preferred_time
  } = req.body;

  try {
    // Insert the vehicle into the database
    const vehicle_id = await insertVehicle({
      customer_id,
      vehicle_type_id,
      make,
      model,
      vin
    });

    // Insert the house service request into the database
    await insertHouseServiceRequest({
      customer_id,
      vehicle_id,
      service_type_id,
      address,
      latitude,
      longitude,
      preferred_date,
      preferred_time
    });

    // Respond with a success message
    res.status(201).json({ message: 'House service request submitted successfully' });
  } catch (error) {
    console.error('Error creating house service request:', error);
    res.status(error.statusCode || 500).json({
      error: error.message || 'Internal Server Error'
    });
  }
};
// Fetch available employees for the service request
const getAvailableEmployees = async (req, res) => {
    try {
      const employees = await houseService.getAvailableEmployees();
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching available employees:', error);
      res.status(500).json({ error: 'Failed to fetch available employees' });
    }
  };
  const getSortedHouseServiceRequests = async (req, res) => {
  try {
    const requests = await houseService.getSortedHouseServiceRequests();
    res.status(200).json(requests);
  } catch (err) {
    console.error('Error fetching sorted house service requests:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Assign an employee to a house service request
const assignEmployeeToRequest = async (req, res) => {
  const { request_id, employee_id } = req.body;

  try {
    // Call the service to assign the employee
    const result = await houseService.assignEmployeeToRequest(request_id, employee_id);

    // Send a success response
    return res.status(200).json(result);
  } catch (error) {
    // Handle any errors
    return res.status(400).json({ error: error.message });
  }
};
const getEmployeeRequests = async (req, res) => {
  const employeeId = req.params.employeeId; // Ensure this matches your route
  console.log('Received request for employeeId:', employeeId); // Log to see the value

  if (!employeeId || isNaN(employeeId)) {
    return res.status(400).json({ 
      error: 'Valid employee ID is required',
      received: employeeId
    });
  }

  try {
    const requests = await houseService.getRequestsByEmployeeId(employeeId);
    res.status(200).json(requests);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch employee requests',
    });
  }
};

const markHouseServiceAsCompleted = async (req, res) => {
  try {
    const { request_id } = req.params;

    const result = await houseService.markRequestAsCompleted(Number(request_id));

    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};

module.exports = {
  createHouseServiceRequest,
    getAvailableEmployees,
  getSortedHouseServiceRequests,
  assignEmployeeToRequest,
  getEmployeeRequests,
  markHouseServiceAsCompleted
};
