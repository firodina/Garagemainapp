import React, { useState, useEffect } from "react";
import vehicleService from "../../../../Service/vehicle.service";
import {
  Card,
  Table,
  Button,
  Form,
  Modal,
  Spinner,
  Alert,
  Pagination,
  Badge,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FaPlus, FaTrash, FaEdit, FaSearch, FaCar } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";


const VehicleTypeManagement = () => {
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [editType, setEditType] = useState({ id: "", name: "" });
  const [deleteTypeId, setDeleteTypeId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter vehicle types based on search term
  const filteredVehicleTypes = vehicleTypes.filter((type) =>
    type.vehicle_type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVehicleTypes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredVehicleTypes.length / itemsPerPage);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const types = await vehicleService.getAllVehicleTypes(token);
        setVehicleTypes(types);
      } catch (err) {
        setError("Failed to load vehicle types");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleTypes();
  }, [token]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAddType = async () => {
    if (!newTypeName.trim()) {
      setSubmitError("Vehicle type name is required");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await vehicleService.createVehicleType(
        newTypeName.trim(),
        token
      );
      setVehicleTypes((prev) => [
        ...prev,
        {
          vehicle_type_id: result.vehicle_type_id,
          vehicle_type_name: newTypeName.trim(),
        },
      ]);
      setNewTypeName("");
      setShowModal(false);
      setSuccessMessage("Vehicle type added successfully!");
    } catch (error) {
      console.error("Error creating vehicle type:", error);
      setSubmitError(error.message || "Failed to create vehicle type");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditType = async () => {
    if (!editType.name.trim()) {
      setSubmitError("Vehicle type name is required");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await vehicleService.updateVehicleType(
        editType.id,
        editType.name.trim(),
        token
      );
      setVehicleTypes((prev) =>
        prev.map((type) =>
          type.vehicle_type_id === editType.id
            ? { ...type, vehicle_type_name: editType.name.trim() }
            : type
        )
      );
      setShowEditModal(false);
      setSuccessMessage("Vehicle type updated successfully!");
    } catch (error) {
      console.error("Error updating vehicle type:", error);
      setSubmitError(error.message || "Failed to update vehicle type");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteType = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await vehicleService.deleteVehicleType(deleteTypeId, token);
      setVehicleTypes((prev) =>
        prev.filter((type) => type.vehicle_type_id !== deleteTypeId)
      );
      setShowDeleteModal(false);
      setSuccessMessage("Vehicle type deleted successfully!");
    } catch (error) {
      console.error("Error deleting vehicle type:", error);
      setSubmitError(error.message || "Failed to delete vehicle type");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (type) => {
    setEditType({ id: type.vehicle_type_id, name: type.vehicle_type_name });
    setShowEditModal(true);
    setSubmitError("");
  };

  const openDeleteModal = (id) => {
    setDeleteTypeId(id);
    setShowDeleteModal(true);
    setSubmitError("");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <FaCar className="me-2" />
            Vehicle Type Management
          </h4>
          <Button variant="light" onClick={() => setShowModal(true)}>
            <FaPlus className="me-2" />
            Add New Type
          </Button>
        </Card.Header>

        <Card.Body>
          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage("")}
              dismissible
              className="animate__animated animate__fadeIn"
            >
              {successMessage}
            </Alert>
          )}

          <div className="mb-4">
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <FormControl
                placeholder="Search vehicle types..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </InputGroup>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                Showing {filteredVehicleTypes.length} vehicle types
              </h5>
              <Badge bg="info" pill>
                Page {currentPage} of {totalPages}
              </Badge>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Type Name</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((type) => (
                    <tr key={type.vehicle_type_id}>
                      <td>
                        <Badge bg="secondary">#{type.vehicle_type_id}</Badge>
                      </td>
                      <td className="fw-bold">{type.vehicle_type_name}</td>
                      <td className="text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => openEditModal(type)}
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => openDeleteModal(type.vehicle_type_id)}
                        >
                          <FaTrash className="me-1" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      {searchTerm ? (
                        <div className="text-muted">
                          No vehicle types found matching "{searchTerm}"
                        </div>
                      ) : (
                        <div className="text-muted">
                          No vehicle types available. Add one to get started.
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {filteredVehicleTypes.length > itemsPerPage && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add Vehicle Type Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaPlus className="me-2" />
            Add New Vehicle Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form.Group controlId="vehicleTypeName" className="mb-3">
            <Form.Label className="fw-bold">Vehicle Type Name</Form.Label>
            <Form.Control
              type="text"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              placeholder="e.g. Sedan, SUV, Truck"
              className="py-2"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddType}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding...
              </>
            ) : (
              "Add Vehicle Type"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Vehicle Type Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <FaEdit className="me-2" />
            Edit Vehicle Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <Form.Group controlId="editVehicleTypeName" className="mb-3">
            <Form.Label className="fw-bold">Vehicle Type Name</Form.Label>
            <Form.Control
              type="text"
              value={editType.name}
              onChange={(e) =>
                setEditType({ ...editType, name: e.target.value })
              }
              placeholder="Enter vehicle type name"
              className="py-2"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleEditType}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>
            <FaTrash className="me-2" />
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitError && <Alert variant="danger">{submitError}</Alert>}
          <p className="lead">
            Are you sure you want to delete this vehicle type?
          </p>
          <p className="text-muted">
            This action cannot be undone. All vehicles associated with this type
            will need to be updated.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteType}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              "Delete Permanently"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VehicleTypeManagement;
