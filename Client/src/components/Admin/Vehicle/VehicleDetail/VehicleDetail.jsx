import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vehicleService from "../../../../Service/vehicle.service";
import customerService from "../../../../Service/customer.service"; // Import customer service
import { Button, Card, Spinner, Alert, Badge } from "react-bootstrap";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [customer, setCustomer] = useState(null); // State for customer data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerLoading, setCustomerLoading] = useState(false); // Loading state for customer fetch

  useEffect(() => {
    const fetchVehicleAndCustomer = async () => {
      try {
        setLoading(true);
        setError("");

        // Get token from auth context
        const token = employee?.employee_token;
        if (!token) {
          throw new Error("Authentication required");
        }

        // Fetch vehicle data
        const vehicleData = await vehicleService.getVehicleById(id, token);

        if (!vehicleData) {
          throw new Error("Vehicle data not received");
        }

        setVehicle(vehicleData);

        // If vehicle has a customer_id, fetch customer details
        if (vehicleData.customer_id) {
          setCustomerLoading(true);
          try {
            const customerData = await customerService.getCustomerById(
              token,
              vehicleData.customer_id
            );
            setCustomer(customerData);
          } catch (customerError) {
            console.error("Error fetching customer:", customerError);
            // Continue even if customer fetch fails
          } finally {
            setCustomerLoading(false);
          }
        }
      } catch (err) {
        console.error("Error in fetchVehicle:", err);
        setError(err.message || "Failed to load vehicle details");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleAndCustomer();
  }, [id, employee?.employee_token]);

  const handleEdit = () => {
    navigate(`/admin/vehicles/edit/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
        <div className="mt-2">
          <Button variant="link" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Alert>
    );
  }

  if (!vehicle) {
    return (
      <Alert variant="warning" className="mt-3">
        Vehicle not found
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <Button variant="outline-secondary" onClick={handleBack} className="mb-3">
        <FaArrowLeft className="me-2" />
        Back to Vehicles
      </Button>

      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Vehicle Details</h3>
          <Button variant="primary" onClick={handleEdit}>
            <FaEdit className="me-2" />
            Edit Vehicle
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Basic Information</h5>
              <hr />
              <p>
                <strong>Type:</strong> {vehicle.vehicle_type_name || "N/A"}
              </p>
              <p>
                <strong>Make:</strong> {vehicle.make || "N/A"}
              </p>
              <p>
                <strong>Model:</strong> {vehicle.model || "N/A"}
              </p>
              <p>
                <strong>Year:</strong> {vehicle.year || "N/A"}
              </p>
              <p>
                <strong>VIN:</strong>{" "}
                <Badge bg="secondary">{vehicle.VIN || "N/A"}</Badge>
              </p>
            </div>
            <div className="col-md-6">
              <h5>Ownership</h5>
              <hr />
              <p>
                <strong>Customer:</strong>{" "}
                {customerLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : customer ? (
                  `${customer.first_name} ${customer.last_name}`
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                <strong>Vehicle ID:</strong> {vehicle.vehicle_id || "N/A"}
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h5>Service History</h5>
              <hr />
              <p className="text-muted">No service history available.</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VehicleDetail;
