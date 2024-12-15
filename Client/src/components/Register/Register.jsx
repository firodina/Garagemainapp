// RegistrationForm.js
import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import myImage from '../../assets/img/img-slide/1000_F_495030243_yk90MSCHEYqz0uNIzyb7gMCSVkRoBwH4.jpg';
// import "./RegistrationForm.css"; // Import the CSS file

function RegistrationForm() {
  return (
    <Container fluid className="registration-container d-flex justify-content-center align-items-center mt-5">
      <Row className="w-100 g-0">
        {/* Left Image Section */}
        <Col md={6} className="d-none d-md-block p-0">
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
          <div className="form-wrapper p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "550px" }}>
            <h2 className="text-center mb-4">Create an Account</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter your username" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Enter your password" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Confirm your password" />
              </Form.Group>

              <div className="d-grid">
                <Button variant="danger" type="submit">
                  Register
                </Button>
              </div>

              <div className="text-center my-3">or</div>

              <div className="d-grid">
                <Button variant="primary">
                  Sign up with Google
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;
