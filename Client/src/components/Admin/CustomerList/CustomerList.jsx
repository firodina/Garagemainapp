import React, { useState, useEffect } from "react";
import {
  Table,
  Spinner,
  Pagination,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import customerService from "../../../../services/customer.service";
import { format } from "date-fns";
// import { useAuth } from "../../../../Contexts/AuthContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CustomerDetail from "../CustomerDetail/CustomerDetail";
import "./CustomerList.css";

const CustomersList = () => {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [showConfirmDelete, setShowConfirmDelete] = useState(false);
//   const [customerToDelete, setCustomerToDelete] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [customersPerPage] = useState(5); // Set to 5 customers per page

//   const { employee } = useAuth();
//   const token = employee ? employee.employee_token : null;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       if (!token) {
//         setApiError(true);
//         setApiErrorMessage("You must be logged in to view this data.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await customerService.getAllCustomers(token);

//         if (!res) {
//           setApiError(true);
//           setApiErrorMessage("Error fetching customers.");
//         } else {
//           setCustomers(res);
//         }
//       } catch (err) {
//         console.error(err);
//         setApiError(true);
//         setApiErrorMessage("An error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, [token]);

//   // Handle pagination
//   const indexOfLastCustomer = currentPage * customersPerPage;
//   const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
//   const currentCustomers = customers.slice(
//     indexOfFirstCustomer,
//     indexOfLastCustomer
//   );

//   const totalPages = Math.ceil(customers.length / customersPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleRowClick = (customer) => {
//     setSelectedCustomer(customer);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => setShowModal(false);

//   const handleDelete = async (customer) => {
//     if (!customer) return;

//     try {
//       await customerService.deleteCustomer(customer.customer_id, token);
//       setCustomers(
//         customers.filter((c) => c.customer_id !== customer.customer_id)
//       );
//       handleCloseModal();
//     } catch (error) {
//       console.error("Error deleting customer:", error);
//     }
//   };

//   const handleEdit = (customer) => {
//     navigate(`/admin/customer/${customer.customer_id}`);
//     handleCloseModal(); // Close the modal after navigation
//   };

  return (
    <>
      {/* {loading ? ( */}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      {/* ) : apiError ? ( */}
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              {/* <h2>{apiErrorMessage}</h2> */}
            </div>
          </div>
        </section>
      {/* ) : ( */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-title">
              <h2>Customers</h2>
              <div className="table-wrapper">
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="compact-table"
                >
                  <thead>
                    <tr>
                      <th>Customer ID</th>
                      <th>Full Name</th>
                      <th>Customer Email</th>
                      <th>Customer Phone</th>
                      <th>Created Date</th>
                      <th>Customer Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {currentCustomers.map((customer) => ( */}
                      <OverlayTrigger
                        // key={customer.customer_id}
                        placement="top"
                        overlay={
                          <Tooltip id="button-tooltip">
                            Click for details
                          </Tooltip>
                        }
                      >
                        <tr
                        //   onClick={() => handleRowClick(customer)}
                          style={{ cursor: "pointer" }}
                        >
                          {/* <td>{customer.customer_id}</td>
                          <td>{`${customer.customer_first_name} ${customer.customer_last_name}`}</td>
                          <td>{customer.customer_email}</td>
                          <td>{customer.customer_phone_number}</td> */}
                          <td>
                            {/* {format(
                            //   new Date(customer.customer_added_date),
                              "MM-dd-yyyy | HH:mm"
                            )} */}
                          </td>
                          <td>
                            {/* {customer.active_customer_status === 1
                              ? "Active"
                              : "Inactive"} */}
                          </td>
                          <td className="action-buttons">
                            <Button
                              variant="link"
                            //   onClick={(e) => {
                            //     e.stopPropagation();
                            //     handleEdit(customer);
                            //   }}
                            >
                              <FaEdit color="blue" />
                            </Button>
                            <Button
                              variant="link"
                              className="ms-2"
                            //   onClick={(e) => {
                            //     e.stopPropagation();
                            //     handleDeleteClick(customer);
                            //   }}
                            >
                              <FaTrashAlt color="red" />
                            </Button>
                          </td>
                        </tr>
                      </OverlayTrigger>
                    {/* ))} */}
                  </tbody>
                </Table>
                <Pagination>
                  {/* {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))} */}
                </Pagination>
              </div>
            </div>
          </div>

          <CustomerDetail
            // customer={selectedCustomer}
            // showModal={showModal}
            // handleCloseModal={handleCloseModal}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
          />
        </section>
      {/* )} */}
    </>
  );
};

export default CustomersList;
