import React, { useEffect, useState } from "react";
import vehicleService from "../../../../Service/vehicle.service";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAllVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Failed to load vehicles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">All Vehicles</h3>
        <Link 
          to="/admin/vehicles/add" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
        >
          Add New Vehicle
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_id} className="hover:bg-gray-50">
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{vehicle.vehicle_id}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{vehicle.vehicle_type_name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{vehicle.make}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{vehicle.model}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{vehicle.year}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <Link 
                      to={`/admin/vehicles/${vehicle.vehicle_id}`}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded-md transition duration-150 ease-in-out"
                      title="View Details"
                    >
                      <FaInfoCircle />
                    </Link>
                    <Link 
                      to={`/admin/vehicles/${vehicle.vehicle_id}/edit`}
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-2 rounded-md transition duration-150 ease-in-out"
                      title="Edit"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="bg-red-100 hover:bg-red-200 text-red-800 p-2 rounded-md transition duration-150 ease-in-out"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;