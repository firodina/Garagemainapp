import React, {useState}  from "react";
import myImage from '../../assets/img/img-slide/1000_F_495030243_yk90MSCHEYqz0uNIzyb7gMCSVkRoBwH4.jpg';
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import loginService from "../../Service/login.service";
import { useAuth } from "../../Contexts/AuthContext";

import {
  Form,
  Button,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLogged, setEmployee, setIsAdmin } = useAuth();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;
  
    // Frontend validation
    if (!employee_email) {
      setEmailError("Please enter your email address");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
  
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
  
    if (!valid) return;
  
    const formData = { employee_email, employee_password };
  
    try {
      const response = await loginService.logIn(formData);
      const data = await response.json();
  
      if (response.ok) {
        // Login success
        localStorage.setItem("employee", JSON.stringify(data.data));
        setIsLogged(true);
        setEmployee(data.data);
        setIsAdmin(data.data.employee_role === 3);
        navigate("/");
      } else {
        // Handle errors properly
        if (data.message === "Incorrect password") {
          setPasswordError("Incorrect password");
        } else if (data.message === "Employee does not exist") {
          setEmailError("Employee does not exist");
        } else {
          setServerError(data.message);
        }
      }
    } catch (err) {
      setServerError("An error has occurred. Please try again later.");
    }
  };
  
  
  
  return (
    <Container fluid className="d-flex justify-content-center align-items-center mt-5" style={{ height: "60vh" }}>
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
            {serverError && <Alert variant="danger">{serverError}</Alert>}
          {emailError && <Alert variant="danger">{emailError}</Alert>}
          {passwordError && <Alert variant="danger">{passwordError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={employee_email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={employee_password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <div className="d-grid">
                <Button variant="danger" type="submit">
                  Login
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
