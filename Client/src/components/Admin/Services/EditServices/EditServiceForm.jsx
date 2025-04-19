import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import serviceService from "../../../../Service/service.service";
import vehicleService from "../../../../Service/vehicle.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const EditServiceForm = () => {
  const { service_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    price: "",
    vehicle_type_name: "",
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [service, types] = await Promise.all([
          serviceService.getServiceById(service_id, employee?.employee_token),
          vehicleService.getAllVehicleTypes(employee?.employee_token),
        ]);

        if (service && service.length > 0) {
          setFormData({
            service_name: service[0].service_name,
            description: service[0].description,
            price: service[0].price,
            vehicle_type_name: service[0].vehicle_type_name,
          });
        }
        setVehicleTypes(types);
      } catch (err) {
        setError(err.message || "Failed to load service data");
      }
    };
    fetchData();
  }, [service_id, employee?.employee_token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await serviceService.updateService(
        service_id,
        formData,
        employee?.employee_token
      );
      setSuccess(true);
      setTimeout(() => navigate("/admin/services"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Edit Service</h2>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-200 rounded-md">
            <div className="flex justify-between">
              <span>{error}</span>
              <button onClick={() => setError("")} className="text-red-700 hover:text-red-900">
                &times;
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 border border-green-200 rounded-md">
            <div className="flex justify-between">
              <span>Service updated successfully! Redirecting...</span>
              <button onClick={() => setSuccess(false)} className="text-green-700 hover:text-green-900">
                &times;
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="service_name" className="block mb-2 font-medium text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              id="service_name"
              name="service_name"
              value={formData.service_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="vehicle_type_name" className="block mb-2 font-medium text-gray-700">
                Vehicle Type
              </label>
              <select
                id="vehicle_type_name"
                name="vehicle_type_name"
                value={formData.vehicle_type_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select vehicle type</option>
                {vehicleTypes.map((type) => (
                  <option
                    key={type.vehicle_type_id}
                    value={type.vehicle_type_name}
                  >
                    {type.vehicle_type_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Service"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceForm;