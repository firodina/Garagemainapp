import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Collapse, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import OrderService from "../../../../services/order.service";
import { format } from "date-fns";
import { BsCheckCircle, BsChevronDown, BsChevronUp } from "react-icons/bs"; // For icons

function Tasks() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openOrderId, setOpenOrderId] = useState(null);
//   const { employee } = useAuth();
//   const employeeId = employee.employee_id;
//   const token = employee ? employee.employee_token : null;

//   // Fetch orders on component mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         // Fetch all orders
//         const allOrders = await OrderService.fetchOrders(employeeId);

//         // Filter orders to only include those with order_status == 1
//         const filteredOrders = allOrders.filter(
//           (order) => order.status?.statusName === 1
//         );

//         setOrders(filteredOrders);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [employeeId]);

//   // Toggle services view for a specific order
//   const handleToggle = (orderId) => {
//     setOpenOrderId(openOrderId === orderId ? null : orderId);
//   };

//   // Toggle service completion and update the database
//   const handleServiceChange = async (orderId, serviceId, currentStatus) => {
//     const newStatus = currentStatus ? 0 : 1; // Toggle status between 0 and 1

//     const formData = {
//       serviceId,
//       orderId,
//       serviceCompleted: newStatus, // Include the new status in the formData
//     };

//     try {
//       const res = await OrderService.Servicecompleted(formData, token);

//       if (res.ok) {
//         // Update the orders state after a successful update
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order.orderId === orderId
//               ? {
//                   ...order,
//                   services: order.services.map((service) =>
//                     service.serviceId === serviceId
//                       ? { ...service, serviceCompleted: newStatus }
//                       : service
//                   ),
//                 }
//               : order
//           )
//         );
//       } else {
//         console.error("Failed to update service status", res.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating service status", error);
//     }
//   };

//   // Handle submission when all services are complete
//   const handleSubmitOrder = async (orderId) => {
//     try {
//       const res = await OrderService.TaskCompleted(orderId, token);

//       if (res.ok) {
//         console.log(`Order ${orderId} submitted successfully.`);
//       } else {
//         console.error("Failed to update service status", res.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating service status", error);
//     }
//   };

//   // Check if all services in an order are completed
//   const isAllServicesCompleted = (services) => {
//     return services.every((service) => service.serviceCompleted === 1);
//   };

//   // Loading state spinner
//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   // Error state display
//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      {/* {orders.length === 0 ? (
        <Alert
          variant="info"
          className="text-center"
          style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#0056b3" }}
        >
          <div>No Orders Assigned Yet</div>
          <div style={{ color: "#007bff", fontSize: "1.5rem" }}>✨</div>
        </Alert>
      ) : ( */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Estimated Date</th>
              <th>Vehicle</th>
              <th>Actions</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <tr>
                  <td>{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge p-2 ${
                        order.status?.statusName === 1
                          ? "bg-warning text-dark"
                          : "bg-success text-white"
                      }`}
                    >
                      {order.status?.statusName === 1
                        ? "Not Completed"
                        : "Completed"}
                    </span>
                  </td>
                  <td>
                    {format(
                      new Date(order.orderInfo.estimatedCompletionDate),
                      "MM-dd-yyyy | HH:mm"
                    )}
                  </td>
                  <td>
                    {order.vehicle.make} {order.vehicle.model} (
                    {order.vehicle.year})
                  </td>
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleToggle(order.orderId)}
                      aria-controls={`services-collapse-${order.orderId}`}
                      aria-expanded={openOrderId === order.orderId}
                    >
                      {openOrderId === order.orderId ? (
                        <BsChevronUp />
                      ) : (
                        <BsChevronDown />
                      )}
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleSubmitOrder(order.orderId)}
                      disabled={!isAllServicesCompleted(order.services)}
                      variant={
                        isAllServicesCompleted(order.services)
                          ? "success"
                          : "secondary"
                      }
                    >
                      {isAllServicesCompleted(order.services) ? (
                        <BsCheckCircle />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="7">
                    <Collapse in={openOrderId === order.orderId}>
                      <div id={`services-collapse-${order.orderId}`}>
                        {order.services.length > 0 ? (
                          <Form>
                            {order.services.map((service) => (
                              <Form.Check
                                key={service.serviceId}
                                type="checkbox"
                                label={`${service.serviceName} - $${service.servicePrice}`}
                                checked={service.serviceCompleted === 1}
                                className={`mb-2 ${
                                  service.serviceCompleted === 1
                                    ? "bg-success p-2 text-white"
                                    : ""
                                }`}
                                onChange={() =>
                                  handleServiceChange(
                                    order.orderId,
                                    service.serviceId,
                                    service.serviceCompleted
                                  )
                                }
                              />
                            ))}
                          </Form>
                        ) : (
                          <div>No services available</div>
                        )}
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))} */}
          </tbody>
        </Table>
      {/* )} */}
    </div>
  );
}

export default Tasks;
