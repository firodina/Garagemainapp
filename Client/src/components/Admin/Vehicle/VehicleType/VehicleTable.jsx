import React, { useEffect, useState } from "react";
import vehicleService from "../../../../Service/vehicle.service";
import { Table, Button, Spinner, Alert, Modal } from "react-bootstrap";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Contexts/AuthContext"; // Import auth context

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get current user from auth context

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = currentUser?.token || localStorage.getItem("token");
        // if (!token) {
        //   throw new Error("Authentication required");
        // }

        const data = await vehicleService.getAllVehicles(token); // Pass token to service
        setVehicles(data);
      } catch (err) {
        setError(err.message || "Failed to load vehicles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [currentUser]); // Add currentUser to dependencies

  const handleEdit = (id) => {
    // Check if user is authenticated before navigating
    // if (!currentUser?.token && !localStorage.getItem("token")) {
    //   setError("Please login to edit vehicles");
    //   return;
    // }
    navigate(`/admin/vehicles/edit/${id}`); // Match your route structure
  };

  const handleDeleteClick = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = currentUser?.token || localStorage.getItem("token");
      // if (!token) {
      //   throw new Error("Authentication required");
      // }

      await vehicleService.deleteVehicle(vehicleToDelete.vehicle_id, token);
      setVehicles(
        vehicles.filter((v) => v.vehicle_id !== vehicleToDelete.vehicle_id)
      );
      setShowDeleteModal(false);
    } catch (err) {
      setError(err.message || "Failed to delete vehicle");
      console.error(err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="vehicle-table-container">
      <div className="table-header">
        <h3>All Vehicles</h3>
        <Link to="/admin/vehicles/add">
          <Button variant="primary">Add New Vehicle</Button>
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td>{vehicle.vehicle_id}</td>
              <td>{vehicle.vehicle_type_name}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td className="actions-cell">
                <Link to={`/admin/vehicles/${vehicle.vehicle_id}`}>
                  <Button variant="info" size="sm" title="View Details">
                    <FaInfoCircle />
                  </Button>
                </Link>
                <Button
                  variant="warning"
                  size="sm"
                  title="Edit"
                  className="mx-2"
                  onClick={() => handleEdit(vehicle.vehicle_id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  title="Delete"
                  onClick={() => handleDeleteClick(vehicle)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this vehicle? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VehicleTable;
