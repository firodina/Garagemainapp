// ScheduleAppointment.js
import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import myImage from '../../assets/img/img-slide/factory-scheduled-maintenance-1024x576.webp';
// import "./ScheduleAppointment.css"; // Import the CSS file

function ScheduleAppointment() {
  return (
    <Container fluid className="schedule-container d-flex justify-content-center align-items-center mt-5" >
      <Row className="w-100">
        {/* Left Image Section */}
        <Col md={6} className="d-none d-md-block">
          <div
            className="left-image"
            style={{
              backgroundImage: `url(${myImage})`, // Replace with your image path
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%"
            }}
          ></div>
        </Col>

        {/* Form Section */}
        <Col md={6} className="d-flex justify-content-center align-items-center p-0">
          <div className="form-wrapper p-4 bg-light rounded shadow">
            <h2 className="text-center mb-4">Schedule Appointment</h2>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Control type="text" placeholder="First name" />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control type="text" placeholder="Last name" />
                </Col>
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Control type="email" placeholder="Email address" />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control type="text" placeholder="Phone number" />
                </Col>
              </Row>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Control as="select">
                    <option>Select Make</option>
                    {/* Dynamically populate vehicle makes */}
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>Ford</option>
                  </Form.Control>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Control as="select">
                    <option>Select Model</option>
                    {/* Dynamically populate vehicle models */}
                    <option>Corolla</option>
                    <option>Civic</option>
                    <option>Mustang</option>
                  </Form.Control>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Control type="text" placeholder="Year" />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Enter service details"
                  rows={2}
                />
              </Form.Group>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Control type="text" placeholder="mm/dd/yyyy" />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control type="text" placeholder="--:-- --" />
                </Col>
              </Row>
              <div className="d-grid">
                <Button variant="danger" type="submit">
                  Submit Now
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ScheduleAppointment;
