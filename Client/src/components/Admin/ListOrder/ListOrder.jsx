import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  Table,
  Container,
  Card,
  Alert,
  Spinner,
  Button,
  Pagination,
  Modal,
} from "react-bootstrap";
import { FaEye, FaEdit, FaSortUp, FaSortDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

function Listorder() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(10);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/api/orders");
//         console.log("API Response:", data);

//         if (data.status === "success") {
//           const ordersData = Array.isArray(data.data) ? data.data : [data.data];

//           // Filter out duplicates by orderId
//           const uniqueOrders = ordersData.filter(
//             (order, index, self) =>
//               index === self.findIndex((o) => o.orderId === order.orderId)
//           );

//           setOrders(uniqueOrders);
//         } else {
//           setError("Failed to fetch orders");
//         }
//       } catch (err) {
//         setError("Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   // Sort orders based on sortOrder
//   const sortedOrders = [...orders].sort((a, b) => {
//     if (sortOrder === "asc") {
//       return a.orderId - b.orderId;
//     } else {
//       return b.orderId - a.orderId;
//     }
//   });

//   // Get the current orders based on pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Function to get status background and text color based on order status
//   const getStatusColor = (status) => {
//     if (status === 1) {
//       return { backgroundColor: "yellow", color: "black" }; // In Process
//     } else {
//       return { backgroundColor: "green", color: "white" }; // Completed
//     }
//   };

//   const handleEditClick = (order) => {
//     setSelectedOrder(order);
//   };

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };

//   // Navigate to ViewsingleOrders component and pass the customerId
//   const handleViewClick = (orderId) => {
//     navigate(`/view-single-order/${orderId}`);
//   };

  return (
    <Container className="my-4">
      <Card>
        <Card.Header>
          <h4>Orders List</h4>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                variant="link"
                // onClick={() => setSortOrder("asc")}
                className="p-0 me-2"
                style={{ fontSize: "1.2rem" }}
              >
                <FaSortUp />
              </Button>
              <Button
                variant="link"
                // onClick={() => setSortOrder("desc")}
                className="p-0"
                style={{ fontSize: "1.2rem" }}
              >
                <FaSortDown />
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {/* {loading ? ( */}
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading orders...</p>
            </div>
          {/* ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : ( */}
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Vehicle</th>
                    <th>Order Date</th>
                    <th>Received by</th>
                    <th>Order Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {currentOrders.map((order) => ( */}
                    <tr style={{ fontSize: "0.8rem" }}>
                    {/* key={order.orderId}
                      <td>{order.orderId}</td> */}
                      <td>
                        <b>
                          {/* {`${order.customer.firstName} ${order.customer.lastName}`} */}
                        </b>
                        <p>
                          {/* {order.customer.email}{" "} */}
                          <small>
                            {/* <p>{order.customer.phoneNumber}</p> */}
                          </small>
                        </p>
                      </td>
                      <td>
                        {/* <b>{`${order.vehicle.make} ${order.vehicle.model}`}</b> */}
                        {/* <p>{order.vehicle.year}</p> */}
                      </td>
                      {/* <td>{new Date(order.orderDate).toLocaleDateString()}</td> */}
                      {/* <td>{`${order.employee.firstName} ${order.employee.lastName}`}</td> */}
                      <td>
                        <span
                          style={{
                            padding: "5px 10px", // Adds padding
                            borderRadius: "5px", // Rounds the corners

                            // backgroundColor:
                            //   order.OrderStatus === 1 ? "yellow" : "green",
                            // // Conditional background color
                            // color: "black ", // Text color for visibility
                          }}
                        >
                          {/* {order.OrderStatus === 1 ? "In Process" : "Completed"} */}
                        </span>
                      </td>

                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2"
                          style={{ fontSize: "0.8rem" }}
                        //   onClick={() => handleViewClick(order.orderId)}
                        >
                          <FaEye /> View
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                        //   onClick={() => handleEditClick(order)}
                          style={{ fontSize: "0.8rem" }}
                        >
                          <FaEdit /> Edit
                        </Button>
                      </td>
                    </tr>
                  {/* ))} */}
                </tbody>
              </Table>

              {/* Pagination component */}
              {/* <Pagination>
                {Array.from({
                  length: Math.ceil(orders.length / ordersPerPage),
                }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination> */}

              {/* Modal for showing order details */}
              <Modal >
              {/* show={selectedOrder !== null} onHide={handleCloseModal} */}
                <Modal.Header closeButton>
                  <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* {selectedOrder && ( */}
                    <>
                      <h5>Order ID: </h5>
                      {/* {selectedOrder.orderId} */}
                      <p>
                        <b>Customer Name:</b>{" "}
                        {/* {`${selectedOrder.customer.firstName} ${selectedOrder.customer.lastName}`} */}
                      </p>
                      <p>
                        <b>Email:</b> 
                        {/* {selectedOrder.customer.email} */}
                      </p>
                      <p>
                        <b>Phone Number:</b>{" "}
                        {/* {selectedOrder.customer.phoneNumber} */}
                      </p>
                      <p>
                        <b>Vehicle:</b>{" "}
                        {/* {`${selectedOrder.vehicle.make} ${selectedOrder.vehicle.model} (${selectedOrder.vehicle.year})`} */}
                      </p>
                      <p>
                        <b>Order Date:</b>{" "}
                        {/* {new Date(selectedOrder.orderDate).toLocaleDateString()} */}
                      </p>
                      <p>
                        <b>Received by:</b>{" "}
                        {/* {`${selectedOrder.employee.firstName} ${selectedOrder.employee.lastName}`} */}
                      </p>
                      <p>
                        <b>Status:</b>{" "}
                        {/* {selectedOrder.activeOrder === 1
                          ? "In Process"
                          : "Completed"} */}
                      </p>
                    </>
                  {/* )} */}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" >
                  {/* onClick={handleCloseModal} */}
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          {/* )} */}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Listorder;
