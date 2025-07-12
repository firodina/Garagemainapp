import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Card,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import serviceService from "../../../../Service/service.service";
import vehicleService from "../../../../Service/vehicle.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    price: "",
    vehicle_type_name: "",
    duration: "", // Added duration field
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleTypesLoading, setVehicleTypesLoading] = useState(true);
  const [error, setError] = useState("");
  const [vehicleTypesError, setVehicleTypesError] = useState("");
  const [success, setSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        setVehicleTypesLoading(true);
        const response = await vehicleService.getAllVehicleTypes(
          employee?.employee_token
        );

        const types = Array.isArray(response) ? response : [];
        setVehicleTypes(types);

        if (types.length === 0) {
          console.warn("No vehicle types found in the database.");
        }

        setVehicleTypesError("");
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        setVehicleTypesError(
          "Failed to load vehicle types. Please try again later."
        );
        setVehicleTypes([]);
      } finally {
        setVehicleTypesLoading(false);
      }
    };
    fetchVehicleTypes();
  }, [employee?.employee_token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vehicle_type_name) {
      setError("Please select a vehicle type");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await serviceService.createService(formData, employee?.employee_token);
      setSuccess(true);
      setFormData({
        service_name: "",
        description: "",
        price: "",
        vehicle_type_name: "",
        duration: "", // Reset duration
      });
      setExpanded(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">Add New Service</Card.Title>

          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
            >
              Service created successfully!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Service Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="service_name"
                    value={formData.service_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={expanded ? 6 : 3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onClick={toggleDescription}
                    onBlur={() => setExpanded(false)}
                    style={{
                      transition: "height 0.3s ease",
                      minHeight: expanded ? "150px" : "auto",
                      cursor: "pointer",
                    }}
                    required
                  />
                  <small className="text-muted">
                    {expanded ? "Click outside to collapse" : "Click to expand"}
                  </small>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Type</Form.Label>
                  {vehicleTypesLoading ? (
                    <div className="d-flex align-items-center">
                      <Spinner animation="border" size="sm" className="me-2" />
                      Loading vehicle types...
                    </div>
                  ) : vehicleTypesError ? (
                    <Alert variant="warning">{vehicleTypesError}</Alert>
                  ) : (
                    <Form.Select
                      name="vehicle_type_name"
                      value={formData.vehicle_type_name}
                      onChange={handleChange}
                      required
                    >
                      <option value=""></option>
                      {vehicleTypes?.map((type) => (
                        <option
                          key={type.vehicle_type_id}
                          value={type.vehicle_type_name}
                        >
                          {type.vehicle_type_name}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Duration (minutes)</Form.Label>
                  <Form.Control
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading || vehicleTypesLoading || vehicleTypesError}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Creating...
                    </>
                  ) : (
                    "Create Service"
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddServiceForm;