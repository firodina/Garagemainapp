import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import serviceService from "../../../../Service/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const ServiceDetail = () => {
  const { service_id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { employee } = useAuth();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await serviceService.getServiceById(
          service_id,
          employee?.employee_token
        );
        setService(data[0]); // Assuming the first item is our service
      } catch (err) {
        setError(err.message || "Failed to load service details");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [service_id, employee?.employee_token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-red-700 bg-red-100 border border-red-200 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="p-4 text-yellow-700 bg-yellow-100 border border-yellow-200 rounded-md">
          Service not found
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-4xl">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col justify-between mb-6 md:flex-row md:items-center">
          <h2 className="text-xl font-bold text-gray-800">Service Details</h2>
          <div className="flex mt-4 space-x-2 md:mt-0">
            <Link
              to={`/admin/services/edit/${service_id}`}
              className="px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-md hover:bg-yellow-200"
            >
              Edit
            </Link>
            <Link 
              to="/admin/services" 
              className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-md hover:bg-gray-200"
            >
              Back to List
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700">ID:</span> {service.service_type_id}
          </div>
          <div>
            <span className="font-medium text-gray-700">Name:</span> {service.service_name}
          </div>
          <div>
            <span className="font-medium text-gray-700">Description:</span> {service.description}
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700">Vehicle Type:</span>
            <span className="px-2 py-1 ml-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
              {service.vehicle_type_name}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Price:</span> ${service.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;