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
  if (loadingData) return <div>Loading customer vehicles...</div>;

  return (
    <div className="mt-6 p-6 border rounded-lg bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Order Date</label>
            <input
              type="date"
              name="order_date"
              value={formData.order_date}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Select Vehicle</label>
            <select
              value={selectedVehicle}
              onChange={(e) => setSelectedVehicle(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
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
          <label className="block font-medium mb-1">Additional Request</label>
          <textarea
            name="additional_request"
            rows={2}
            value={formData.additional_request}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {selectedVehicle && (
          <>
            <h3 className="text-lg font-semibold mt-4">Select Services</h3>
            <div className="grid gap-3">
              {availableServices.length === 0 && (
                <p className="text-gray-500">
                  No services available for this vehicle type.
                </p>
              )}
              {availableServices.map((service) => {
                const isChecked = selectedServiceIds.includes(service.service_id);
                const isExpanded = expandedServiceIds.includes(service.service_id);
                const truncated = service.description.length > 100 && !isExpanded;

                return (
                  <div
                    key={service.service_id}
                    className="flex items-start gap-2 border p-3 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleServiceCheckboxChange(service.service_id)}
                      className="mt-1"
                    />
                    <div>
                      <label className="font-medium">
                        {service.name} — ${service.price}
                      </label>
                      <p className="text-sm text-gray-600">
                        {truncated
                          ? service.description.slice(0, 100) + "..."
                          : service.description}
                      </p>
                      {service.description.length > 100 && (
                        <button
                          type="button"
                          className="text-blue-600 text-sm"
                          onClick={(e) => toggleDescription(service.service_id, e)}
                        >
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleAddServices}
              disabled={isSubmitting || selectedServiceIds.length === 0}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Services
            </button>
          </>
        )}

        {formData.services.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mt-4">Selected Services</h3>
            <div className="space-y-2">
              {formData.services.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <span>
                    {service.name || `Service #${service.service_id}`} - ${service.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Total Price</label>
            <input
              type="number"
              name="order_total_price"
              value={formData.order_total_price}
              readOnly
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Submitting..." : "Create Order"}
        </button>
      </form>
    </div>
  );
};

export default AddOrderForm;