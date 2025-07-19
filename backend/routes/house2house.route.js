const express = require('express');
const router = express.Router();
const { createHouseServiceRequest, 
getAvailableEmployees,
getSortedHouseServiceRequests, assignEmployeeToRequest,getEmployeeRequests, markHouseServiceAsCompleted
} = require('../controllers/House2house.controller');
const { body } = require('express-validator');

// Route to handle POST house service request
router.post('/api/house-service-request', [
  body('customer_id').isInt(),
  body('vehicle_type_id').isInt(),
  body('service_type_id').isInt(),
  body('make').notEmpty(),
  body('model').notEmpty(),
  body('vin').notEmpty(),
  body('address').notEmpty(),
  body('latitude').isFloat(),
  body('longitude').isFloat(),
  body('preferred_date').isISO8601(),
  body('preferred_time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
], createHouseServiceRequest);
// Route to fetch available employees for the service request
router.get('/api/available-employees', getAvailableEmployees);
// Route to fetch sorted house service requests
router.get('/api/sorted-house-service-requests', getSortedHouseServiceRequests);

router.post('/api/assign-employee', assignEmployeeToRequest);

router.get('/api/employee/:employeeId/requests', getEmployeeRequests);

router.put("/api/requests/:request_id/complete", markHouseServiceAsCompleted);



module.exports = router;
