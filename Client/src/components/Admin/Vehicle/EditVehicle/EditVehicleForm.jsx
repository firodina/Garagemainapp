import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vehicleService from "../../../../Service/vehicle.service";
import VehicleTypeSelect from "../VehicleType/VehicleTypeSelect";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const EditVehicleForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    vehicle_type_name: "",
    make: "",
    model: "",
    year: "",
    VIN: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [initialLoadError, setInitialLoadError] = useState("");

  const validateVin = (vin) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    return vinRegex.test(vin);
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const vehicle = await vehicleService.getVehicleById(
          vehicleId,
          currentUser.token
        );
        setFormData({
          vehicle_type_name: vehicle.vehicle_type_name,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          VIN: vehicle.VIN,
        });
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        setInitialLoadError("Failed to load vehicle data");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.token) {
      fetchVehicle();
    } else {
      setInitialLoadError("Authentication required");
      setLoading(false);
    }
  }, [vehicleId, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vehicle_type_name)
      newErrors.vehicle_type_name = "Vehicle type is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.VIN) newErrors.VIN = "VIN is required";

    if (formData.VIN && !validateVin(formData.VIN)) {
      newErrors.VIN = "Invalid VIN format (17 alphanumeric characters)";
    }

    const currentYear = new Date().getFullYear();
    if (
      formData.year &&
      (formData.year < 1900 || formData.year > currentYear + 1)
    ) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (!currentUser?.token) {
        throw new Error("Authentication required");
      }

      const result = await vehicleService.updateVehicle(
        vehicleId,
        formData,
        currentUser.token
      );

      if (result) {
        navigate(`/vehicles/${vehicleId}`, {
          state: { success: true, message: "Vehicle updated successfully!" },
        });
      } else {
        setSubmitError("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setSubmitError(error.message || "Failed to update vehicle");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (initialLoadError)
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
        {initialLoadError}
      </div>
    );

  return (
    <div className="container px-4 mx-auto mt-8 max-w-4xl">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Edit Vehicle</h2>
      {submitError && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="vehicle_type_name" className="block mb-2 font-medium text-gray-700">
            Vehicle Type <span className="text-red-500">*</span>
          </label>
          <VehicleTypeSelect
            name="vehicle_type_name"
            value={formData.vehicle_type_name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.vehicle_type_name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.vehicle_type_name && (
            <p className="mt-1 text-sm text-red-600">{errors.vehicle_type_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="make" className="block mb-2 font-medium text-gray-700">
            Make <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-md ${errors.make ? "border-red-500" : "border-gray-300"}`}
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
          />
          {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make}</p>}
        </div>

        <div>
          <label htmlFor="model" className="block mb-2 font-medium text-gray-700">
            Model <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-md ${errors.model ? "border-red-500" : "border-gray-300"}`}
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model}</p>}
        </div>

        <div>
          <label htmlFor="year" className="block mb-2 font-medium text-gray-700">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            className={`w-full p-2 border rounded-md ${errors.year ? "border-red-500" : "border-gray-300"}`}
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 1}
          />
          {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
        </div>

        <div>
          <label htmlFor="VIN" className="block mb-2 font-medium text-gray-700">
            VIN (Vehicle Identification Number) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-md ${errors.VIN ? "border-red-500" : "border-gray-300"}`}
            id="VIN"
            name="VIN"
            value={formData.VIN}
            onChange={handleChange}
            placeholder="17-character VIN"
          />
          {errors.VIN && <p className="mt-1 text-sm text-red-600">{errors.VIN}</p>}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
                Updating...
              </span>
            ) : (
              "Update Vehicle"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicleForm;