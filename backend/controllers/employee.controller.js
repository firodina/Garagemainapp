//import employee service
const employeeService = require("../services/employee.service");

// Create a new employee
const createEmployee = async (req, res) => {
  console.log("Received request body:", req.body); // Log request body

  // Check if the required fields are present
  if (!req.body.employee_email) {
    console.log("Error: employee_email is undefined!");
    return res
      .status(400)
      .json({ error: "Missing required field: employee_email" });
  }

  // Log the incoming file details
  if (req.file) {
    console.log("Uploaded file details:", req.file);
  } else {
    console.log("No file uploaded!");
  }

  try {
    // Check if the employee already exists
    const employeeExists = await employeeService.checkIfEmployeeExists(
      req.body.employee_email
    );

    if (employeeExists) {
      return res.status(400).json({
        error:
          "This email address is already associated with another employee!",
      });
    }

    // Create the path for the uploaded image
    const employeeImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Log the employee image path
    console.log("Employee Image Path:", employeeImage);

    const row1 = [
      req.body.employee_email,
      req.body.active_employee,
      employeeImage, // Pass the image path
    ];
    const row2 = [
      req.body.employee_first_name,
      req.body.employee_last_name,
      req.body.employee_phone,
    ];
    const row3 = [req.body.company_role_id];
    const employeePassword = req.body.employee_password;

    // Log row data
    console.log("Row1 Data:", row1);
    console.log("Row2 Data:", row2);
    console.log("Row3 Data:", row3);

    // Create the employee
    const employee = await employeeService.createEmployee(
      row1, // Includes employee_image
      row2,
      row3,
      employeePassword
    );

    if (!employee) {
      console.log("Failed to create employee, invalid data.");
      return res.status(400).json({ error: "Failed to add the employee!" });
    }

    return res.status(200).json({
      success: true,
      message: "Employee added successfully",
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      error: "Something went wrong!",
      details: error.message, // Send error details for debugging
    });
  }
};
// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}
async function updateEmployee(req, res) {
  try {
    // Validate required fields
    if (!req.body.employee_id) {
      return res.status(400).json({
        status: "fail",
        error: "Employee ID is required",
      });
    }

    // Process the update
    const result = await employeeService.updateEmployee(req.body);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("Controller error:", error);

    const statusCode = error.message.includes("not found") ? 404 : 500;
    res.status(statusCode).json({
      status: "error",
      error: error.message || "Internal server error",
    });
  }
}
//create the delete employee controller
async function deleteEmployee(req, res, next) {
  const employeeId = req.params.employeeId;
  try {
    const result = await employeeService.deleteEmployee(employeeId);
    if (!result) {
      return res.status(400).json({
        error: "Failed to delete employee!",
      });
    }
    res.status(200).json({
      success: "true",
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.log("Controller Error:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
    // console.log("controller error",error)
  }
}

//get by id
async function getEmployeeById(req, res, next) {
  const employeeId = req.params.employeeId;
  try {
    const employee = await employeeService.getEmployeeById(employeeId);
    if (!employee) {
      return res.status(400).json({
        error: "Failed to get employee!",
      });
    }
    res.status(200).json({
      status: "success",
      data: employee,
    });
  } catch (error) {
    console.log("Controller Error:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
// Create the getEmployeeStats controller
async function getEmployeeStats(req, res, next) {
  // Call the getEmployeeStats method from the employee service
  const employeeStats = await employeeService.getEmployeeStats();
  if (!employeeStats) {
    res.status(400).json({
      error: "Failed to get employee stats!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employeeStats,
    });
  }
}
//create the reset password controller
async function resetEmployeePassword(req, res, next) {
  const employeeId = req.params.employeeId;
  try {
    const result = await employeeService.resetEmployeePassword(employeeId);
    if (!result) {
      return res.status(400).json({
        error: "Failed to reset password!",
      });
    }
    res.status(200).json({
      success: "true",
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Controller Error:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
    // console.log("controller error",error)
  }
}
// Export the createEmployee controller
//change password
async function changePassword(req, res, next) {
  const employeeId = req.params.employeeId;
  const newPassword = req.body.newPassword;
  try {
    const result = await employeeService.changePassword(
      employeeId,
      newPassword
    );
    if (!result) {
      return res.status(400).json({
        error: "Failed to change password!",
      });
    }
    res.status(200).json({
      success: "true",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("Controller Error:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
    // console.log("controller error",error)
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  resetEmployeePassword,
  changePassword,
  getEmployeeStats,
};
