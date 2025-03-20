import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Button, Collapse } from "react-bootstrap";
// import { useAuth } from "../../../Contexts/AuthContext";
// import OrderService from "../../../Service/employee.service";
import { BsChevronDown, BsChevronUp } from "react-icons/bs"; // For icons
import { FaCheckCircle } from "react-icons/fa"; // Importing checkmark icon
import { format } from "date-fns";

function EmployeeHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openOrderId, setOpenOrderId] = useState(null);
//   const { employee } = useAuth();
//   const employeeId = employee.employee_id;
//   const token = employee ? employee.employee_token : null;

//   // Fetch completed orders on component mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const fetchOrder = await OrderService.fetchOrders(employeeId);

//         // Filter to keep only orders with all services completed
//         const completedOrders = fetchOrder.filter((order) =>
//           order.services.every((service) => service.serviceCompleted === 1)
//         );

//         setOrders(completedOrders);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [employeeId]);

//   // Toggle view for a specific order's services
//   const handleToggle = (orderId) => {
//     setOpenOrderId(openOrderId === orderId ? null : orderId);
//   };

//   // Format date safely
//   const safeFormatDate = (date) => {
//     try {
//       return format(new Date(date), "MM-dd-yyyy | HH:mm");
//     } catch {
//       return "Invalid date";
//     }
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
      <h2>Completed Orders History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Completion Date</th>
            <th>Vehicle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {orders.map((order) => (
            <React.Fragment key={order.orderId}>
              <tr>
                <td>{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                <td>{safeFormatDate(order.orderDate)}</td>
                <td>
                  {safeFormatDate(order.orderInfo.estimatedCompletionDate)}
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
              </tr>
              <tr>
                <td colSpan="5">
                  <Collapse in={openOrderId === order.orderId}>
                    <div id={`services-collapse-${order.orderId}`}>
                      {order.services.length > 0 ? (
                        <ul>
                          {order.services.map((service) => (
                            <li key={service.serviceId}>
                              {service.serviceName}{" "}
                              {service.serviceCompleted === 1 && (
                                <FaCheckCircle color="green" className="ml-2" />
                              )}
                              - Completed on{" "}
                              {safeFormatDate(service.completedDate)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div>No services available</div>
                      )}
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))} */}
           <div>No services available</div>
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeHistory;
