import React, { useState } from "react";
import customerService from "../../../../Service/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import AddVehicleForm from "../../Vehicle/AddVehicle/AddVehicleForm";

function AddCustomerForm() {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [customer_id, setCustomerId] = useState(null);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { employee } = useAuth();

  const token = employee?.employee_token;
  const isAdmin = employee?.employee_role === 3;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (
      !email ||
      !first_name ||
      !last_name ||
      !phone ||
      !address ||
      !password
    ) {
      setServerError("All fields are required.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setServerError("Please enter a valid email address.");
      return;
    }

    // Password strength validation
    if (password.length < 8) {
      setServerError("Password must be at least 8 characters long.");
      return;
    }

    const formData = {
      first_name,
      last_name,
      email,
      phone,
      address,
      registered_at: new Date().toISOString(),
      password,
    };

    setLoading(true);
    setServerError("");
    setSuccess(false);

    try {
      const response = await customerService.createCustomer(formData, token);

      setSuccess(true);
      setSuccessMessage(
        isAdmin
          ? "Customer added successfully and approved!"
          : "Customer added successfully! Pending admin approval."
      );
      setCustomerId(response.customer_id);

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPassword("");

      // Show vehicle form if needed
      setShowVehicleForm(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to add customer. Please try again.";
      setServerError(errorMessage);
      console.error("Error adding customer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center min-h-[40vh] my-[50px]">
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Add a New Customer</h2>

          {/* Error Message */}
          {serverError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative">
              <span className="absolute top-0 right-0 px-2 py-1 cursor-pointer" onClick={() => setServerError("")}>
                &times;
              </span>
              {serverError}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded relative">
              <span className="absolute top-0 right-3 px-2 py-1 cursor-pointer" onClick={() => setSuccess(false)}>
                &times;
              </span>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter customer email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  rows={2}
                  placeholder="Enter full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Create password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Customer...
                    </span>
                  ) : (
                    "Add Customer"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Show vehicle form after successful customer creation */}
      {showVehicleForm && customer_id && (
        <div className="mt-8">
          <AddVehicleForm customerId={customer_id} />
        </div>
      )}
    </>
  );
}

export default AddCustomerForm;