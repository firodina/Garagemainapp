import React, { useEffect, useState } from "react";
import { Spinner, Alert, Card, ListGroup, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../../Contexts/AuthContext";

function MyProfile() {
  const { customer } = useAuth(); // Get customer info from AuthContext
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ password: "", newPassword: "" });

  useEffect(() => {
    // Simulate loading customer data
    if (!customer) {
      setError("No customer profile found.");
      setLoading(false);
    } else {
      setLoading(false); // Assume customer data is loaded successfully
    }
  }, [customer]);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/customer/${customer.customer_id}/change-password`, formData);
      alert("Password changed successfully!");
      setFormData({ password: "", newPassword: "" }); // Reset form data
      setShowModal(false);
    } catch (err) {
      setError("Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading profile details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {customer ? (
        <Card className="mt-4">
          <Card.Header>
            <h4>My Profile</h4>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <strong>Name:</strong> {customer.customer_first_name} {customer.customer_last_name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {customer.customer_email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Phone Number:</strong> {customer.customer_phone_number || "N/A"}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" onClick={handleModalOpen}>
                  Change Password
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <p>No profile found.</p>
      )}

      {/* Modal for Changing Password */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MyProfile;