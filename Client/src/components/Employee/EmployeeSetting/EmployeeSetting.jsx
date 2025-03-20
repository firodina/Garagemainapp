import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import EmployeeService from "../../../Service/employee.service"; 
import { useAuth } from "../../../Contexts/AuthContext";

function EmployeeSetting() {
  const { employee, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    try {
      setLoading(true);
      await EmployeeService.changePassword(employee.employee_id, newPassword);
      setSuccess("Password changed successfully.");
      setError(null);
      logout();
    } catch (error) {
      setError("Failed to change password.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const validatePasswords = () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return false;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return false;
    }
    // Additional password validations can be added here (e.g., special characters, numbers)
    setError(null);
    return true;
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Title className="text-center mb-4 fs-3 fw-bold">
              Change Password
            </Card.Title>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>} 
              <Form >
                <Form.Group controlId="currentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  disabled={loading}
                >
                  {loading ? "Changing..." : "Change Password"} 
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeSetting;
