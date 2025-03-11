
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
// import { FaEdit } from "react-icons/fa";
// import { useAuth } from "../../../../Contexts/AuthContext";

function MyOrders() {
//   const { orderId } = useParams(); // Retrieve order ID from the URL
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
// //   const { isLogged, employee } = useAuth();
//   const customerId = employee.customer_id;

//   useEffect(() => {
//     if (customerId) {
//       const fetchOrderDetails = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:3000/api/order/customer/${customerId}`
//           );
//           if (!response.data) {
//             throw new Error("Failed to fetch order details");
//           } else {
//             setOrderDetails(response.data);
//           }
//         } catch (err) {
//           setError("Failed to fetch order details");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchOrderDetails();
//     }
//   }, [customerId]);

  // if (loading) {
  //   return (
  //     <div className="text-center">
  //       <Spinner animation="border" />
  //       <p>Loading order details...</p>
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
              <h4>Your History</h4>
            </Card.Header>
            <Card.Body> */}
              {/* <h5>Customer Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Name:</strong> {order.customer.firstName}{" "}
                  {order.customer.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {order.customer.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {order.customer.phoneNumber}
                </ListGroup.Item>
              </ListGroup>

              <h5 className="mt-3">Vehicle Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Make:</strong> {order.vehicle.make}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Model:</strong> {order.vehicle.model}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Year:</strong> {order.vehicle.year}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Color:</strong> {order.vehicle.color}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Mileage:</strong> {order.vehicle.mileage}
                </ListGroup.Item>
              </ListGroup>

              <h5 className="mt-3">Order Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Total Price:</strong> ${order.orderInfo.totalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Estimated Completion Date:</strong>{" "}
                  {new Date(
                    order.orderInfo.estimatedCompletionDate
                  ).toLocaleDateString()}
                </ListGroup.Item>
              </ListGroup> */}

              {/* <h5 className="mt-3">Service Information</h5>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Service Name:</strong> {order.services.serviceName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong>{" "}
                  {order.services.serviceDescription}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ${order.services.servicePrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Service Completed:</strong>{" "}
                  {order.services.serviceCompleted ? "Yes" : "No"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      ) : ( */}
        <p>No orders found.</p>
     
    </div>
  );
}

export default MyOrders;
