import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerService from "../../../../Service/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const CustomerUpdate = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    customer_phone_number: "",
    active_customer_status: false,
    customer_address: "",
  });

  const [inputErrors, setInputErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await customerService.getCustomerById(token, customerId);
        if (data) {
          setFormData({
            customer_first_name: data.first_name || "",
            customer_last_name: data.last_name || "",
            customer_email: data.email || "",
            customer_phone_number: data.phone || "",
            active_customer_status: data.approved || false,
            customer_address: data.address || "",
          });
        } else {
          throw new Error("Customer data not found.");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setErrorMessage(error.message || "Failed to load customer data.");
      }
    };

    fetchCustomerData();
  }, [customerId, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newInputErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" && key !== "customer_address") {
        newInputErrors[key] = true;
      }
    }

    if (Object.keys(newInputErrors).length > 0) {
      setInputErrors(newInputErrors);
      setIsLoading(false);
      return;
    }

    const updatedCustomerData = {
      customer_id: customerId,
      first_name: formData.customer_first_name,
      last_name: formData.customer_last_name,
      address: formData.customer_address,
      email: formData.customer_email,
      phone: formData.customer_phone_number,
    };

    try {
      const response = await customerService.updateCustomer(
        customerId,
        updatedCustomerData,
        token
      );
      if (!response) {
        throw new Error("Failed to update customer. Please try again.");
      }
      navigate("/admin/customers");
    } catch (error) {
      setErrorMessage(error.message || "Failed to update customer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Edit: {formData.customer_first_name} {formData.customer_last_name}
        </h2>
        <h4 className="text-gray-600 mb-6">Customer email: {formData.customer_email}</h4>

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="customerFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="customerFirstName"
                name="customer_first_name"
                value={formData.customer_first_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputErrors.customer_first_name ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="customerLastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="customerLastName"
                name="customer_last_name"
                value={formData.customer_last_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputErrors.customer_last_name ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="customerEmail"
                name="customer_email"
                value={formData.customer_email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputErrors.customer_email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label htmlFor="customerPhoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                id="customerPhoneNumber"
                name="customer_phone_number"
                value={formData.customer_phone_number}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputErrors.customer_phone_number ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="customerAddress"
              name="customer_address"
              value={formData.customer_address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="customerActiveStatus"
              name="active_customer_status"
              checked={formData.active_customer_status}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="customerActiveStatus" className="ml-2 block text-sm text-gray-700">
              Is approved customer
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerUpdate;