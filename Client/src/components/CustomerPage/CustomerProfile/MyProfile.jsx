
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Spinner,
//   Alert,
//   Card,
//   ListGroup,
//   Button,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import { useAuth } from "../../../../Contexts/AuthContext";

function MyProfile() {
  // const { orderId } = useParams(); // Retrieve order ID from the URL (if needed)
  // const [orderDetails, setOrderDetails] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [formData, setFormData] = useState({ password: "", newPassword: "" });
  // const { isLogged, employee } = useAuth();
  // const customerId = employee?.customer_id;

  // useEffect(() => {
  //   if (customerId) {
  //     const fetchOrderDetails = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:3000/api/order/customer/${customerId}`
  //         );
  //         if (!response.data) {
  //           throw new Error("Failed to fetch order details");
  //         }
  //         setOrderDetails(response.data);
  //       } catch (err) {
  //         setError("Failed to fetch order details");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchOrderDetails();
  //   }
  // }, [customerId]);

  // const handleModalOpen = () => setShowModal(true);
  // const handleModalClose = () => setShowModal(false);

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handlePasswordChange = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(
  //       `http://localhost:3000/api/customer/${customerId}/change-password`,
  //       formData
  //     );
  //     alert("Password changed successfully!");
  //     setFormData({ password: "", newPassword: "" }); // Reset form data
  //     setShowModal(false);
  //   } catch (err) {
  //     setError("Failed to change password");
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="text-center">
  //       <Spinner animation="border" />
  //       <p>Loading profile details...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <Alert variant="danger">{error}</Alert>;
  // }

  return (
    <div>
      {/* {orderDetails && orderDetails.length > 0 ? (
        orderDetails.map((order) => (
          <Card className="mt-4" key={order.orderId}>
            <Card.Header>
              <h4>My Profile</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {order.customer.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {order.customer.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="primary" onClick={handleModalOpen}>
                    Change Password
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      ) : ( */}
        <p>No profile found.</p>
      

      {/* Modal for Changing Password */}
      {/* <Modal show={showModal} onHide={handleModalClose}>
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
      </Modal> */}
    </div>
  );
}

export default MyProfile;

