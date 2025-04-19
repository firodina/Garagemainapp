import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import vehicleService from "../../../../Service/vehicle.service";
import VehicleTypeSelect from "../VehicleType/VehicleTypeSelect";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Button, Spinner, Alert, Form } from "react-bootstrap";

const EditVehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { employee } = useAuth();
  const [formData, setFormData] = useState({
    vehicle_type_name: "",
    make: "",
    model: "",
    year: "",
    VIN: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [initialLoadError, setInitialLoadError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const validateVin = (vin) => {
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
    return vinRegex.test(vin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();

    if (!formData.vehicle_type_name.trim()) {
      newErrors.vehicle_type_name = "Vehicle type is required";
    }
    if (!formData.make.trim()) {
      newErrors.make = "Make is required";
    }
    if (!formData.model.trim()) {
      newErrors.model = "Model is required";
    }
    if (!formData.year) {
      newErrors.year = "Year is required";
    } else if (formData.year < 1900 || formData.year > currentYear + 1) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
    }
    if (!formData.VIN.trim()) {
      newErrors.VIN = "VIN is required";
    } else if (!validateVin(formData.VIN)) {
      newErrors.VIN = "Invalid VIN format (17 alphanumeric characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setInitialLoadError("");

        const token = employee?.employee_token;
        if (!token) {
          throw new Error("Authentication required - please log in");
        }

        const vehicle = await vehicleService.getVehicleById(id, token);

        if (!vehicle) {
          throw new Error(`Vehicle with ID ${id} not found`);
        }

        setFormData({
          vehicle_type_name: vehicle.vehicle_type_name || "",
          make: vehicle.make || "",
          model: vehicle.model || "",
          year: vehicle.year || "",
          VIN: vehicle.VIN || "",
        });
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        const errorMsg =
          error.response?.data?.message ||
          error.message ||
          "Failed to load vehicle data";
        setInitialLoadError(errorMsg);

        if (error.response?.status === 401) {
          navigate("/login", { state: { from: location.pathname } });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, employee?.employee_token, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const token = employee?.employee_token;
      if (!token) {
        throw new Error("Authentication required - please log in");
      }

      const updatedVehicle = await vehicleService.updateVehicle(
        id,
        formData,
        token
      );

      if (updatedVehicle) {
        setShowSuccess(true);
        // Show success message for 3 seconds before redirecting
        setTimeout(() => {
          navigate(`/admin/vehicles`);
        }, 3000);
      } else {
        throw new Error("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to update vehicle";
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
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

  if (initialLoadError) {
    return (
      <Alert variant="danger" className="mt-3">
        {initialLoadError}
        <div className="mt-2">
          <Button variant="link" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Vehicle</h2>

      {showSuccess ? (
        <Alert variant="success">
          Vehicle updated successfully! Redirecting to vehicle details...
        </Alert>
      ) : (
        <>
          {submitError && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setSubmitError("")}
            >
              {submitError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Vehicle Type <span className="text-danger">*</span>
              </Form.Label>
              <VehicleTypeSelect
                name="vehicle_type_name"
                value={formData.vehicle_type_name}
                onChange={handleChange}
                isInvalid={!!errors.vehicle_type_name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.vehicle_type_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Make <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                isInvalid={!!errors.make}
              />
              <Form.Control.Feedback type="invalid">
                {errors.make}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Model <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                isInvalid={!!errors.model}
              />
              <Form.Control.Feedback type="invalid">
                {errors.model}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Year <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                isInvalid={!!errors.year}
              />
              <Form.Control.Feedback type="invalid">
                {errors.year}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                VIN <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="VIN"
                value={formData.VIN}
                onChange={handleChange}
                placeholder="17-character VIN"
                isInvalid={!!errors.VIN}
              />
              <Form.Control.Feedback type="invalid">
                {errors.VIN}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
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
                  "Update Vehicle"
                )}
              </Button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default EditVehicleForm;
