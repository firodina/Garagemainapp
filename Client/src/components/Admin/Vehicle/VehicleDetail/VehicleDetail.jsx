import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vehicleService from "../../../../Service/vehicle.service";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const VehicleDetail = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await vehicleService.getVehicleById(vehicleId);
        setVehicle(data);
      } catch (err) {
        setError("Failed to load vehicle details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleEdit = () => {
    navigate(`/vehicles/${vehicleId}/edit`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>;
  if (!vehicle) return <div className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg">Vehicle not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button
        onClick={handleBack}
        className="flex items-center px-4 py-2 mb-6 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Vehicles
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-800">Vehicle Details</h3>
          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaEdit className="mr-2" />
            Edit Vehicle
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h5>
              <hr className="mb-4" />
              <div className="space-y-3">
                <p><span className="font-medium text-gray-700">Type:</span> {vehicle.vehicle_type_name}</p>
                <p><span className="font-medium text-gray-700">Make:</span> {vehicle.make}</p>
                <p><span className="font-medium text-gray-700">Model:</span> {vehicle.model}</p>
                <p><span className="font-medium text-gray-700">Year:</span> {vehicle.year}</p>
                <p className="flex items-center">
                  <span className="font-medium text-gray-700">VIN:</span> 
                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-200 rounded-md">{vehicle.VIN}</span>
                </p>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-700">Ownership</h5>
              <hr className="mb-4" />
              <div className="space-y-3">
                <p><span className="font-medium text-gray-700">Customer ID:</span> {vehicle.customer_id}</p>
                <p><span className="font-medium text-gray-700">Vehicle ID:</span> {vehicle.vehicle_id}</p>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 text-gray-700">Service History</h5>
            <hr className="mb-4" />
            <p className="text-gray-500">No service history available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;