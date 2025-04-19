import React, { useState, useEffect } from "react";
import orderService from "../../../../Service/order.service";
import vehicleService from "../../../../Service/vehicle.service";
import serviceService from "../../../../Service/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AddOrderForm = ({ customer_id, onCancel, onSuccess }) => {
  const { employee } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_id,
    vehicle_id: "",
    order_date: new Date().toISOString().split("T")[0],
    additional_request: "",
    order_total_price: 0,
    services: [],
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [expandedServiceIds, setExpandedServiceIds] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!employee?.employee_token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoadingData(true);
        const vehiclesData = await vehicleService.getVehiclesByCustomerId(
          employee.employee_token,
          customer_id
        );
        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
      } catch (err) {
        setError(err.message || "Failed to load data.");
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [customer_id, employee?.employee_token, navigate]);

  useEffect(() => {
    if (selectedVehicle) {
      const selectedVehicleObj = vehicles.find(
        (v) => v.vehicle_id === selectedVehicle
      );

      if (!selectedVehicleObj) {
        setError("Selected vehicle is not valid.");
        return;
      }

      const selectedVehicleType = selectedVehicleObj.vehicle_type;

      if (!selectedVehicleType) {
        setError("Vehicle type is not defined.");
        return;
      }

      const fetchServices = async () => {
        try {
          const services = await serviceService.getServicesByVehicleType(
            selectedVehicleType,
            employee.employee_token
          );
          setAvailableServices(services);
        } catch (error) {
          setError("Failed to fetch services.");
        }
      };

      fetchServices();
    }
  }, [selectedVehicle, vehicles, employee?.employee_token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceCheckboxChange = (serviceId) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleDescription = (serviceId, e) => {
    e.stopPropagation();
    setExpandedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleAddServices = () => {
    if (!selectedVehicle) {
      setError("Please select a vehicle.");
      return;
    }

    const selectedServices = availableServices.filter((service) =>
      selectedServiceIds.includes(service.service_id)
    );

    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    const newServices = selectedServices.map((service) => ({
      service_id: service.service_id,
      service_completed: 0,
      price: service.price,
    }));

    const totalAmount = newServices.reduce((sum, s) => sum + s.price, 0);

    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, ...newServices],
      order_total_price: prev.order_total_price + totalAmount,
      vehicle_id: selectedVehicle,
    }));

    setSelectedServiceIds([]);
    setError("");
  };

  const handleRemoveService = (index) => {
    const removedService = formData.services[index];
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
      order_total_price: prev.order_total_price - removedService.price,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const payload = {
      employee_id: employee.employee_id,
      customer_id: formData.customer_id,
      vehicle_id: formData.vehicle_id,
      order_date: formData.order_date,
      order_total_price: formData.order_total_price,
      additional_request: formData.additional_request,
      notes_for_internal_use: "",
      notes_for_customer: "",
      additional_requests_completed: 0,
      services: formData.services.map((s) => ({
        service_id: s.service_id,
        service_completed: 0,
      })),
      order_status: 1,
    };

    try {
      await orderService.createOrder(payload, employee.employee_token);
      if (onSuccess) onSuccess();
      onCancel();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!employee?.employee_token) return null;
  
  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading customer vehicles...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Order</h2>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Date *
              </label>
              <input
                type="date"
                name="order_date"
                value={formData.order_date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Vehicle *
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.vehicle_id} value={v.vehicle_id}>
                    {v.make} {v.model} ({v.year}) - {v.plate_number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Request
            </label>
            <textarea
              name="additional_request"
              rows={3}
              value={formData.additional_request}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special requests or notes..."
            />
          </div>

          {selectedVehicle && (
            <>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Services</h3>
                
                {availableServices.length === 0 ? (
                  <p className="text-gray-500 italic">No services available for this vehicle type.</p>
                ) : (
                  <div className="space-y-3">
                    {availableServices.map((service) => {
                      const isChecked = selectedServiceIds.includes(service.service_id);
                      const isExpanded = expandedServiceIds.includes(service.service_id);
                      const truncated = service.description.length > 100 && !isExpanded;

                      return (
                        <div
                          key={service.service_id}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer ${isChecked ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                          onClick={() => handleServiceCheckboxChange(service.service_id)}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleServiceCheckboxChange(service.service_id)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-start">
                              <label className="block text-sm font-medium text-gray-700">
                                {service.name} — <span className="text-blue-600">${service.price}</span>
                              </label>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {truncated
                                ? `${service.description.substring(0, 100)}...`
                                : service.description}
                            </p>
                            {service.description.length > 100 && (
                              <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-800 mt-1"
                                onClick={(e) => toggleDescription(service.service_id, e)}
                              >
                                {isExpanded ? 'Show Less' : 'Read More'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddServices}
                  disabled={isSubmitting || selectedServiceIds.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Selected Services
                </button>
              </div>
            </>
          )}

          {formData.services.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Services</h3>
              <div className="space-y-2">
                {formData.services.map((service, index) => {
                  const serviceInfo = availableServices.find(s => s.service_id === service.service_id) || {};
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div>
                        <span className="font-medium text-gray-800">
                          {serviceInfo.name || `Service #${service.service_id}`}
                        </span>
                        <span className="ml-2 text-blue-600">${service.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-200 pt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Price
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  name="order_total_price"
                  value={formData.order_total_price.toFixed(2)}
                  readOnly
                  className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.services.length === 0}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Order...
                </span>
              ) : (
                'Create Order'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderForm;