import React, { useState } from "react";
import vehicleService from "../../../../Service/vehicle.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const AddVehicleTypeForm = () => {
  const [vehicleTypeName, setVehicleTypeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { employee } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleTypeName.trim()) {
      setError("Vehicle type name is required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await vehicleService.createVehicleType(
        vehicleTypeName,
        employee?.employee_token
      );

      setSuccess(true);
      setVehicleTypeName("");
      console.log("Vehicle type created:", response);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create vehicle type";
      setError(errorMessage);
      console.error("Error creating vehicle type:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-center text-xl font-semibold mb-6">
          Add New Vehicle Type
        </h2>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={() => setError("")} 
                className="text-red-700 hover:text-red-900"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
            <div className="flex justify-between items-center">
              <span>Vehicle type created successfully!</span>
              <button 
                onClick={() => setSuccess(false)} 
                className="text-green-700 hover:text-green-900"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Vehicle Type Name</label>
            <input
              type="text"
              placeholder="Enter vehicle type (e.g., Sedan, SUV, Truck)"
              value={vehicleTypeName}
              onChange={(e) => setVehicleTypeName(e.target.value)}
              maxLength={50}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-500 text-sm mt-1">Maximum 50 characters</p>
          </div>

          <div className="grid">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Vehicle Type"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleTypeForm;