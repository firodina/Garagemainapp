const customerService = require("../services/customer.service");
const {
  notifyAdminNewCustomer,
} = require("../services/notifyAdminNewCustomer"); // adjust path

// Controller to add a customer
// Backend - Controller
const addCustomer = async (req, res) => {
  try {
    const isAdmin = req.user?.company_role_id === 3;

    const newCustomer = await customerService.addCustomer(req.body, isAdmin);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: "Failed to add customer" });
  }
};

const publicCustomerSignUp = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone,
      email,
      password,
      address,
      registered_at,
    } = req.body;

    if (!first_name || !last_name || !phone || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingCustomer = await customerService.getCustomerByEmail(email);
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const customerData = {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      phone,
      email,
      password,
      address,
      registered_at: registered_at || new Date().toISOString(),
    };

    const newCustomer = await customerService.addCustomer(customerData, false);

    // ✅ Notify admin of new signup
    await notifyAdminNewCustomer(newCustomer);

    res.status(201).json({
      message: "Customer registered successfully. Awaiting admin approval.",
      customer: {
        id: newCustomer.customer_id,
        first_name: newCustomer.first_name,
        last_name: newCustomer.last_name,
        phone: newCustomer.phone,
        email: newCustomer.email,
      },
    });
  } catch (error) {
    console.error("Public Customer Sign-Up Error:", error.message);
    res.status(500).json({ error: "Failed to register customer" });
  }
};

// Controller to get all customers
async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller to get a customer by ID
async function getCustomerById(req, res) {
  try {
    const { customer_id } = req.params;
    const customer = await customerService.getCustomerById(customer_id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller to update a customer
async function updateCustomer(req, res) {
  try {
    // Extract customer_id from request body
    const customer_id = req.body.customer_id;

    if (!customer_id) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    // Update the customer
    const customerData = req.body;
    const updatedCustomer = await customerService.updateCustomer(customerData);

    if (!updatedCustomer || !updatedCustomer.customer_id) {
      return res.status(400).json({ error: "Failed to update the customer!" });
    }

    return res.status(200).json({
      status: "success",
      customer_id: updatedCustomer.customer_id,
    });
  } catch (error) {
    console.error("Update error:", error.message);
    return res.status(500).json({ error: "Something went wrong!" });
  }
}

async function deleteCustomer(req, res) {
  try {
    const customerId = req.params.id;

    // Delete the customer
    await customerService.deleteCustomer(customerId);

    return res.status(200).json({
      message: "Customer deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting customer:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}
async function getCustomerByEmail(req, res) {
  try {
    const { email } = req.params;

    if (!email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email is required" });
    }

    const customerData = await customerService.getCustomerByEmail(email);

    if (!customerData) {
      return res
        .status(404)
        .json({ status: "fail", message: "Customer not found" });
    }

    return res.status(200).json({ status: "success", data: customerData });
  } catch (error) {
    console.error("Error fetching customer by email:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
}
// Create the getEmployeeStats controller
async function getCustomerStatus(req, res, next) {
  const customerStatus = await customerService.getCustomerStatus();

  if (!customerStatus) {
    return res.status(400).json({
      error: "Failed to get customer status!",
    });
  }
  res.status(200).json({
    status: "success",

    data: customerStatus,
  });
}

const getNonApprovedCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomersByApprovalStatus(0);

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching non-approved customers" });
  }
};
// CONTROLLER
const approveCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const result = await customerService.approveCustomer(customerId);
    res.json({ message: "Customer approved successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const unapproveCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await customerService.unapproveCustomer(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found." });
    }

    res.status(200).json({ message: "Customer unapproved successfully." });
  } catch (error) {
    console.error("Error unapproving customer:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// In customer.controller.js

async function changePassword(req, res) {
  const customerId = req.params.customerId;
  const newPassword = req.body.newPassword;

  try {
    const result = await customerService.changePassword(
      customerId,
      newPassword
    );

    if (!result) {
      return res.status(400).json({ error: "Failed to change password!" });
    }

    res.status(200).json({
      success: "true",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Controller Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Export all controllers
module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
  getCustomerStatus,
  getNonApprovedCustomers,
  approveCustomer,
  unapproveCustomer,
  publicCustomerSignUp,
  changePassword,
};
