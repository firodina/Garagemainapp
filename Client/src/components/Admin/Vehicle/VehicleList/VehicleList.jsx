import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import vehicleService from "../../../../Service/vehicle.service";
import { Table, Button, Alert, Spinner } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus, FaCar } from "react-icons/fa";

const VehicleList = () => {
  const { customer_id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMessage(location.state.message);
      // Clear the state after showing the message
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getAllVehicles();
        // Filter vehicles by customer_id if provided
        const filteredVehicles = customer_id
          ? data.filter((v) => v.customer_id == customer_id)
          : data;
        setVehicles(filteredVehicles);
      } catch (err) {
        setError("Failed to load vehicles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [customer_id]);

  const handleAddVehicle = () => {
    navigate(`/customers/${customer_id}/vehicles/add`);
  };

  const handleEditVehicle = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}/edit`);
  };

  const handleViewDetails = (vehicleId) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <FaCar className="me-2" />
          {customer_id ? "Customer Vehicles" : "All Vehicles"}
        </h2>
        {customer_id && (
          <Button variant="primary" onClick={handleAddVehicle}>
            <FaPlus className="me-2" />
            Add Vehicle
          </Button>
        )}
      </div>

      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      {vehicles.length === 0 ? (
        <div className="alert alert-info">
          No vehicles found. {customer_id && "Add a vehicle to get started."}
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Type</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_id}>
                <td>{vehicle.vehicle_type_name}</td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td className="font-monospace">{vehicle.VIN}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(vehicle.vehicle_id)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditVehicle(vehicle.vehicle_id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm">
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default VehicleList;
