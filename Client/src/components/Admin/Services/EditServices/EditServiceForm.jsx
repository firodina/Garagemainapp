import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Alert,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import serviceService from "../../../../Service/service.service";
import vehicleService from "../../../../Service/vehicle.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const EditServiceForm = () => {
  const { service_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    price: "",
    vehicle_type_name: "",
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { employee } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [service, types] = await Promise.all([
          serviceService.getServiceById(service_id, employee?.employee_token),
          vehicleService.getAllVehicleTypes(employee?.employee_token),
        ]);

        if (service && service.length > 0) {
          setFormData({
            service_name: service[0].service_name,
            description: service[0].description,
            price: service[0].price,
            vehicle_type_name: service[0].vehicle_type_name,
          });
        }
        setVehicleTypes(types);
      } catch (err) {
        setError(err.message || "Failed to load service data");
      }
    };
    fetchData();
  }, [service_id, employee?.employee_token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await serviceService.updateService(
        service_id,
        formData,
        employee?.employee_token
      );
      setSuccess(true);
      setTimeout(() => navigate("/admin/services"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">Edit Service</Card.Title>

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
              Service updated successfully! Redirecting...
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
                    rows={3}
                    height="500px"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
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
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Select
                    name="vehicle_type_name"
                    value={formData.vehicle_type_name}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select vehicle type</option>
                    {vehicleTypes.map((type) => (
                      <option
                        key={type.vehicle_type_id}
                        value={type.vehicle_type_name}
                      >
                        {type.vehicle_type_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Service"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditServiceForm;
