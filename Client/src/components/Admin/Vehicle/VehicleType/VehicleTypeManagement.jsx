import React, { useState, useEffect } from "react";
import vehicleService from "../../../../Service/vehicle.service";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const VehicleTypeManagement = () => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleAddType = async () => {
    if (!newTypeName.trim()) {
      setSubmitError("Vehicle type name is required");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await vehicleService.createVehicleType(newTypeName.trim());
      if (result) {
        setVehicleTypes((prev) => [
          ...prev,
          {
            vehicle_type_id: result.data.vehicleTypeId,
            vehicle_type_name: newTypeName.trim(),
          },
        ]);
        setNewTypeName("");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error creating vehicle type:", error);
      setSubmitError(error.message || "Failed to create vehicle type");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Vehicle Type Management</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center transition duration-150"
        >
          <FaPlus className="mr-2" />
          Add Vehicle Type
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {vehicleTypes.map((type) => (
              <tr key={type.vehicle_type_id} className="hover:bg-gray-50">
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{type.vehicle_type_id}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{type.vehicle_type_name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-2 rounded-md">
                      <FaEdit />
                    </button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-800 p-2 rounded-md">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Vehicle Type Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold">Add New Vehicle Type</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="p-4">
              {submitError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                  {submitError}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="vehicleTypeName" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type Name
                </label>
                <input
                  type="text"
                  id="vehicleTypeName"
                  value={newTypeName}
                  onChange={(e) => setNewTypeName(e.target.value)}
                  placeholder="Enter vehicle type name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleAddType}
                disabled={isSubmitting}
                className={`px-4 py-2 text-white rounded-md transition duration-150 flex items-center ${
                  isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Type"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleTypeManagement;