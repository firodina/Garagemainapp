import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaRegSmile } from "react-icons/fa"; // For an icon
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmployeeDashboard.css"; // Custom CSS file
// import { useAuth } from "../../../Contexts/AuthContext";
import { Link } from "react-router-dom";
function EmployeeDashboard() {
//   const { employee } = useAuth();
  return (
    <Container className="my-4">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <Card className="welcome-card mb-4">
            <Card.Body>
              <FaRegSmile className="welcome-icon" />
              <Card.Title className="mt-2">
                Welcome,{" "}
                {/* {employee ? `${employee.employee_first_name} ` : "Employee"}! */}
              </Card.Title>
              <Card.Text>
                We are excited to have you Here are your dashboard
              </Card.Text>
              <Link to="/employee/tasks">
                <Button variant="primary" size="lg">
                  View Orders
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="ms-2">
                Manage Profile
              </Button>
            </Card.Body>
          </Card>
          {/* Additional content can go here */}
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeDashboard;
