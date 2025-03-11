import React, { useState } from "react";
import { Form, Button, Modal, Alert, Row, Col } from "react-bootstrap";
// import vehicleService from "../../../../services/vehicle.service"; // Adjust the path as needed
// import { useAuth } from "../../../../Contexts/AuthContext";
// import { useNavigate } from "react-router";

function AddVehicleForm({ show, handleClose, customerId }) {
    // { show, handleClose, customerId }
//   const [vehicle_make, setMake] = useState("");
//   const [vehicle_model, setModel] = useState("");
//   const [vehicle_year, setYear] = useState("");
//   const [vehicle_tag, setTag] = useState("");
//   const [vehicle_mileage, setMileage] = useState("");
//   const [vehicle_color, setColor] = useState("");
//   const [vehicle_type, setType] = useState("");
//   const [vehicle_serial, setSerial] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [serverError, setServerError] = useState("");
//   const { employee } = useAuth();
//   const token = employee ? employee.employee_token : null;
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     let valid = true;

//     if (!vehicle_make) {
//       setServerError("Make is required");
//       valid = false;
//     } else if (!vehicle_model) {
//       setServerError("Model is required");
//       valid = false;
//     } else if (
//       !vehicle_year ||
//       isNaN(vehicle_year) ||
//       vehicle_year.length !== 4
//     ) {
//       setServerError("Invalid year");
//       valid = false;
//     } else if (!vehicle_tag) {
//       setServerError("Tag is required");
//       valid = false;
//     } else if (!vehicle_mileage || isNaN(vehicle_mileage)) {
//       setServerError("Mileage must be a number");
//       valid = false;
//     } else if (!vehicle_color) {
//       setServerError("Color is required");
//       valid = false;
//     } else if (!vehicle_type) {
//       setServerError("Type is required");
//       valid = false;
//     } else if (!vehicle_serial) {
//       setServerError("Serial is required");
//       valid = false;
//     } else {
//       setServerError("");
//     }

//     if (!valid) {
//       setLoading(false);
//       return;
//     }

//     const formData = {
//       customer_id: customerId.customer_id,
//       vehicle_make,
//       vehicle_model,
//       vehicle_year,
//       vehicle_tag,
//       vehicle_mileage,
//       vehicle_color,
//       vehicle_type,
//       vehicle_serial,
//     };

//     try {
//       const response = await vehicleService.createVehicle(formData, token);
//       if (!response) {
//         throw new Error("Failed to add vehicle");
//       }

//       setSuccess(true);
//       setServerError("");
//       setTimeout(() => {
//         handleClose();
//         navigate("/admin/customers");
//       }, 2000);
//     } catch (error) {
//       setServerError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <Modal  show={show}>
        {/* show={show} onHide={handleClose} */}
      <Modal.Header closeButton>
        <Modal.Title>Add Vehicle Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {serverError && <Alert variant="danger">{serverError}</Alert>}
        {success && (
          <Alert variant="success">Vehicle added successfully!</Alert>
        )} */}
        <Form>
        {/* onSubmit={handleSubmit} */}
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Make"
                //   value={vehicle_make}
                //   onChange={(e) => setMake(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Model"
                //   value={vehicle_model}
                //   onChange={(e) => setModel(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Year"
                //   value={vehicle_year}
                //   onChange={(e) => setYear(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Tag"
                //   value={vehicle_tag}
                //   onChange={(e) => setTag(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Mileage"
                //   value={vehicle_mileage}
                //   onChange={(e) => setMileage(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Color"
                //   value={vehicle_color}
                //   onChange={(e) => setColor(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Type"
                //   value={vehicle_type}
                //   onChange={(e) => setType(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Serial"
                //   value={vehicle_serial}
                //   onChange={(e) => setSerial(e.target.value)}
                //   isInvalid={!!serverError}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" >
            {/* {loading ? "Adding..." : "Add Vehicle"} */}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddVehicleForm;
