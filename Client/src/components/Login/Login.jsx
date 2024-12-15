import React from "react";
import myImage from '../../assets/img/img-slide/1000_F_495030243_yk90MSCHEYqz0uNIzyb7gMCSVkRoBwH4.jpg';

import {
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Login() {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
      <Row className="w-100">
        {/* Left Image Section */}
        <Col md={6} className="d-none d-md-block">
          <div
            className="h-100 w-100 bg-dark"
            style={{
              backgroundImage: `url(${myImage})`
, // Replace with your image URL
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Col>

        {/* Form Section */}
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <div className="p-4 bg-light rounded shadow" style={{ width: "100%", maxWidth: "600px" }}>
            <h2 className="text-center mb-4">Login to Your Account</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Enter your password" />
              </Form.Group>

              <div className="d-grid">
                <Button variant="danger" type="submit">
                  Login
                </Button>
              </div>

              <div className="text-center my-3">or</div>

              <div className="d-grid">
                <Button variant="primary">
                  Sign in with Google
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
