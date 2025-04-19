import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Alert,
  Spinner,
  Button,
  Badge,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import serviceService from "../../../../Service/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";

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
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!service) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Service not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4 d-flex justify-content-between align-items-center">
            <span>Service Details</span>
            <div>
              <Link
                to={`/admin/services/edit/${service_id}`}
                className="btn btn-warning me-2"
              >
                Edit
              </Link>
              <Link to="/admin/services" className="btn btn-secondary">
                Back to List
              </Link>
            </div>
          </Card.Title>

          <Card.Text>
            <strong>ID:</strong> {service.service_type_id}
          </Card.Text>
          <Card.Text>
            <strong>Name:</strong> {service.service_name}
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {service.description}
          </Card.Text>
          <Card.Text>
            <strong>Vehicle Type:</strong>{" "}
            <Badge bg="info">{service.vehicle_type_name}</Badge>
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${service.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ServiceDetail;
