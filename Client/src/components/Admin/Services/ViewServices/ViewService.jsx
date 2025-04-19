import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Alert,
  Spinner,
  Card,
  Badge,
  Row,
  Col,
  InputGroup,
  FormControl,
  ButtonGroup,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
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
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Tooltips for action buttons
  const editTooltip = (props) => (
    <Tooltip id="edit-tooltip" {...props}>
      Edit Service
    </Tooltip>
  );

  const deleteTooltip = (props) => (
    <Tooltip id="delete-tooltip" {...props}>
      Delete Service
    </Tooltip>
  );

  return (
    <Container className="py-4">
      <Card className="shadow border-0">
        <Card.Header className="bg-primary text-white">
          <Row className="align-items-center">
            <Col md={6}>
              <h4 className="mb-0">
                <FaMoneyBillWave className="me-2" />
                Service Management
              </h4>
            </Col>
            <Col md={6} className="text-md-end">
              <Link to="/admin/services/add" className="btn btn-light bg-dark">
                <FaPlus className="me-1 " /> Add New Service
              </Link>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}

          <Row className="mb-4">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search services..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
              </InputGroup>
            </Col>
            <Col
              md={6}
              className="d-flex align-items-center justify-content-end"
            >
              <Badge pill bg="info" className="me-2">
                Total Services: {services.length}
              </Badge>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Service Name</th>
                  <th>Description</th>
                  <th>Vehicle Type</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <tr key={service.service_type_id}>
                      <td>
                        <Badge bg="secondary">#{service.service_type_id}</Badge>
                      </td>
                      <td>
                        <strong>{service.service_name}</strong>
                      </td>
                      <td
                        style={{ maxWidth: "300px", cursor: "pointer" }}
                        onClick={() =>
                          toggleDescription(service.service_type_id)
                        }
                      >
                        <div className="d-flex align-items-center">
                          <small className="text-muted">
                            {expandedDescriptions[service.service_type_id] ||
                              service.description.length <= 50
                              ? service.description
                              : `${service.description.substring(0, 50)}...`}
                          </small>
                          {service.description.length > 50 && (
                            <span className="ms-2">
                              {expandedDescriptions[service.service_type_id] ? (
                                <FaChevronUp size={12} />
                              ) : (
                                <FaChevronDown size={12} />
                              )}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <Badge bg="success">{service.vehicle_type_name}</Badge>
                      </td>
                      <td>
                        <Badge bg="warning" text="dark">
                          $
                          {typeof service.price === "number"
                            ? service.price.toFixed(2)
                            : "0.00"}
                        </Badge>
                      </td>
                      <td className="text-center">
                        <ButtonGroup>
                          <OverlayTrigger placement="top" overlay={editTooltip}>
                            <Link
                              to={`/admin/services/edit/${service.service_type_id}`}
                              className="btn btn-sm btn-outline-primary me-2"
                              style={{
                                borderRadius: "20px",
                                padding: "5px 15px",
                                transition: "all 0.3s",
                                borderWidth: "2px",
                              }}
                            >
                              <FaEdit className="me-1" /> Edit
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="top"
                            overlay={deleteTooltip}
                          >
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                handleDelete(service.service_type_id)
                              }
                              style={{
                                borderRadius: "20px",
                                padding: "5px 15px",
                                transition: "all 0.3s",
                                borderWidth: "2px",
                              }}
                            >
                              <FaTrash className="me-1" /> Delete
                            </Button>
                          </OverlayTrigger>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      {searchTerm ? (
                        <Alert variant="info">
                          No services found matching your search criteria
                        </Alert>
                      ) : (
                        <Alert variant="warning">
                          No services available. Add your first service!
                        </Alert>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewAllServices;
