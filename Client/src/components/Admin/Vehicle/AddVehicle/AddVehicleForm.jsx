import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { useAuth } from "../../../../Contexts/AuthContext";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import vehicleService from "../../../../Service/vehicle.service";

const AddVehicleForm = ({ customerId }) => {
  const navigate = useNavigate();
  const { employee } = useAuth();
  const token = employee?.employee_token;

  const [formData, setFormData] = useState({
    vehicle_type_name: "",
    make: "",
    model: "",
    year: "",
    VIN: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      if (!token || !showForm) return;

      setLoadingTypes(true);
      try {
        const types = await vehicleService.getAllVehicleTypes(token);
        console.log(types);
        setVehicleTypes(types);
      } catch (error) {
        console.error("Error fetching vehicle types:", error);
        setServerError("Failed to load vehicle types. Please try again.");
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchVehicleTypes();
  }, [token, showForm]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vehicle_type_name)
      newErrors.vehicle_type_name = "Type is required";
    if (!formData.make) newErrors.make = "Make is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.year) newErrors.year = "Year is required";
    if (!formData.VIN) newErrors.VIN = "VIN is required";

    const currentYear = new Date().getFullYear();
    if (
      formData.year &&
      (formData.year < 1900 || formData.year > currentYear + 1)
    ) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 1}`;
    }

    if (formData.VIN && formData.VIN.length !== 17) {
      newErrors.VIN = "VIN must be exactly 17 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await vehicleService.createVehicle(
        customerId,
        formData,
        token
      );

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/admin/customer/profile/${customerId}`);
        }, 1500);
      } else {
        setServerError(response.error || "Failed to add vehicle");
      }
    } catch (error) {
      setServerError(
        error.response?.data?.error ||
          error.message ||
          "An error occurred while adding the vehicle"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="form-group col-md-12">
        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
          style={{
            width: "200px",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#e74c3c",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
          }}
        >
          Add Vehicle
        </Button>
      </div>
    );
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title d-flex justify-content-between align-items-center mb-4">
          <h2>Add New Vehicle</h2>
          <FaArrowUpWideShort
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => setShowForm(false)}
          />
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-12">
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            {success && (
              <Alert variant="success">
                Vehicle added successfully! Redirecting...
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <div className="row">
                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Year *</Form.Label>
                  <Form.Control
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    isInvalid={!!errors.year}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.year}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Make *</Form.Label>
                  <Form.Control
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    isInvalid={!!errors.make}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.make}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Model *</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    isInvalid={!!errors.model}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.model}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-md-6 mb-3">
                  <Form.Label>Type *</Form.Label>
                  <Form.Control
                    as="select"
                    name="vehicle_type_name"
                    value={formData.vehicle_type_name}
                    onChange={handleChange}
                    isInvalid={!!errors.vehicle_type_name}
                    required
                    disabled={loadingTypes}
                  >
                    <option value="">
                      {loadingTypes
                        ? "Loading vehicle types..."
                        : "Select type"}
                    </option>
                    {vehicleTypes.map((type) => (
                      <option
                        key={type.vehicle_type_id}
                        value={type.vehicle_type_name}
                      >
                        {type.vehicle_type_name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.vehicle_type_name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-md-12 mb-3">
                  <Form.Label>VIN (17 characters) *</Form.Label>
                  <Form.Control
                    type="text"
                    name="VIN"
                    value={formData.VIN}
                    onChange={handleChange}
                    isInvalid={!!errors.VIN}
                    required
                    maxLength={17}
                    minLength={17}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.VIN}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="form-group col-md-12 mt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting || loadingTypes}
                    style={{
                      width: "200px",
                      height: "50px",
                      fontSize: "18px",
                    }}
                  >
                    {isSubmitting ? (
                      <Spinner as="span" size="sm" animation="border" />
                    ) : (
                      "Add Vehicle"
                    )}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddVehicleForm;
