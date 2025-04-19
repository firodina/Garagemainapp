import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronUp,
  FaInfoCircle,
} from "react-icons/fa";
import serviceService from "../../../../Service/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const ViewAllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const { employee } = useAuth();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await serviceService.getAllServices(
        employee?.employee_token
      );
      const validatedData = data.map((service) => ({
        ...service,
        price: Number(service.price) || 0,
      }));
      setServices(validatedData);
    } catch (err) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await serviceService.deactivateService(
          serviceId,
          employee?.employee_token
        );
        fetchServices();
      } catch (err) {
        setError(err.message || "Failed to delete service");
      }
    }
  };

  const toggleDescription = (serviceId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const filteredServices = services.filter(
    (service) =>
      service.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.vehicle_type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-6 mx-auto">
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        {/* Card Header */}
        <div className="px-6 py-4 bg-blue-600 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-xl font-bold">
                <FaMoneyBillWave className="inline mr-2" />
                Service Management
              </h4>
            </div>
            <div>
              <Link 
                to="/admin/services/add" 
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-md hover:bg-gray-100"
              >
                <FaPlus className="mr-2" /> Add New Service
              </Link>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
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

          {/* Search and Stats */}
          <div className="flex flex-col mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search services..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                Total Services: {services.length}
              </span>
            </div>
          </div>

          {/* Services Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                    Service Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                    Vehicle Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <tr key={service.service_type_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full">
                          #{service.service_type_id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{service.service_name}</div>
                      </td>
                      <td 
                        className="px-6 py-4 max-w-[300px] cursor-pointer"
                        onClick={() => toggleDescription(service.service_type_id)}
                      >
                        <div className="flex items-center">
                          <p className="text-sm text-gray-500">
                            {expandedDescriptions[service.service_type_id] ||
                            service.description.length <= 50
                              ? service.description
                              : `${service.description.substring(0, 50)}...`}
                          </p>
                          {service.description.length > 50 && (
                            <span className="ml-2">
                              {expandedDescriptions[service.service_type_id] ? (
                                <FaChevronUp size={12} />
                              ) : (
                                <FaChevronDown size={12} />
                              )}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                          {service.vehicle_type_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                          ${typeof service.price === "number" ? service.price.toFixed(2) : "0.00"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/admin/services/edit/${service.service_type_id}`}
                            className="inline-flex items-center px-3 py-1 text-sm text-blue-600 bg-white border border-blue-600 rounded-full hover:bg-blue-50"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(service.service_type_id)}
                            className="inline-flex items-center px-3 py-1 text-sm text-red-600 bg-white border border-red-600 rounded-full hover:bg-red-50"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center">
                      {searchTerm ? (
                        <div className="p-4 text-blue-800 bg-blue-100 rounded-md">
                          No services found matching your search criteria
                        </div>
                      ) : (
                        <div className="p-4 text-yellow-800 bg-yellow-100 rounded-md">
                          No services available. Add your first service!
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllServices;