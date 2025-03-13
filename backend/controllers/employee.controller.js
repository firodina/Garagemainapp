
//import employee service
const employeeService = require("../services/employee.service");

// Create a new employee
const createEmployee = async (req, res) => {
  console.log("Request body:", req.body); // Log the entire request body
  try {
    const employeeExists = await employeeService.checkIfEmployeeExists(
      req.body.employee_email
    );


    if (employeeExists) {
      return res.status(400).json({
        error:
          "This email address is already associated with another employee!",
      });
    }

    const employeeImage = req.file ? `/uploads/${req.file.filename}` : null;

    const row1 = [
      req.body.employee_email,
      req.body.active_employee,
      employeeImage, // Path to the uploaded image
    ];
    const row2 = [
      req.body.employee_first_name,
      req.body.employee_last_name,
      req.body.employee_phone,
    ];
    const row3 = [req.body.company_role_id];
    const employeePassword = req.body.employee_password;

    const employee = await employeeService.createEmployee(
      row1,
      row2,
      row3,
      employeePassword
    );

    if (!employee) {
      return res.status(400).json({
        error: "Failed to add the employee!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Employee added successfully",
        data: employee,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
module.exports = {
    createEmployee,
}