import React, { useEffect, useState } from "react";
import vehicleService from "../../../../Service/vehicle.service";

const VehicleTypeSelect = ({ value, onChange, required = false, className = "" }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const types = await vehicleService.getAllVehicleTypes();
        setVehicleTypes(types);
      } catch (err) {
        setError("Failed to load vehicle types");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, []);

  if (loading) return <div className="text-gray-500">Loading vehicle types...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <select
      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        className ? className : "border-gray-300"
      }`}
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="">Select Vehicle Type</option>
      {vehicleTypes.map((type) => (
        <option key={type.vehicle_type_id} value={type.vehicle_type_name}>
          {type.vehicle_type_name}
        </option>
      ))}
    </select>
  );
};

export default VehicleTypeSelect;