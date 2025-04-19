const customerService = require("../services/customer.service");

// Controller to add a customer
// Backend - Controller
async function addCustomer(req, res) {
  try {
    // Check if the requester is an admin (by checking the user's role)
    const isAdmin = req.user && req.user.role === "admin"; 

    // Call the service to add the customer
    const customer = await customerService.addCustomer(req.body, isAdmin);

    console.log("Customer added successfully:", customer);
    res.status(201).json({ message: "Customer added successfully", customer });
  } catch (error) {
    console.error("Error adding customer:", error.message);
    res.status(500).json({ error: error.message });
  }
}


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
    console.log(email);

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
  console.log(customerStatus);
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

// Export all controllers
module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
  getCustomerStatus,
};
