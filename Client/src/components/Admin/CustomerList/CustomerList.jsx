import React, { useEffect, useState } from "react";
import customerService from "../../../Service/customer.service"
import { useAuth } from "../../../Contexts/AuthContext";
import { FaRegEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchCustomer from "../SearchCustomer/SearchCustomer"; // import the SearchCustomer component
import CustomerDetail from "../CustomerDetail/CustomerDetail"; // import the CustomerDetail modal

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const itemsPerPage = 10;
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomers = async () => {
      if (!token) return;
      try {
        const data = await customerService.getAllCustomers(token);
        setCustomers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadCustomers();
  }, [token]);

  const totalPages = Math.max(Math.ceil(customers.length / itemsPerPage), 1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleEditButtonClick = (customerId) => {
    navigate(`/admin/customer/${customerId}`);
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      customer.first_name.toLowerCase().includes(searchTerm) ||
      customer.last_name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.toLowerCase().includes(searchTerm)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = async (customerId) => {
    if (!token) return;
    try {
      await customerService.deleteCustomer(token, customerId); // Ensure token is passed first
      setCustomers(
        customers.filter((customer) => customer.customer_id !== customerId)
      );
      setShowDeleteModal(false); // Close the modal after successful deletion
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <section className="contact-section">
      <div className="my-3">
        <div className="contact-title contact-customer mb-4">
          <h2>Customers</h2>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="position-relative" style={{ width: "80%" }}>
            <SearchCustomer onSearch={handleSearch} />
          </div>
        </div>
        {customers.length > 0 ? (
          <div className="table-responsive text-center">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      {new Date(customer.registered_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="text-center">
                      {customer.active_customer_status ? "Approved" : "Pending"}
                    </td>

                    <td className="text-center">
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: "10px" }}
                      >
                        <FaRegEdit
                          size={20}
                          onClick={() =>
                            handleEditButtonClick(customer.customer_id)
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <Link
                          to={`/admin/customer/profile/${customer.customer_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <FaEye size={18} />
                        </Link>
                        <FaTrash
                          size={20}
                          color="red"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setCustomerToDelete(customer); // Set the customer to be deleted
                            setShowDeleteModal(true); // Show delete confirmation modal
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <nav
              aria-label="Page navigation"
              className="d-flex justify-content-center my-4"
            >
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(1)}
                  >
                    First
                  </button>
                </li>
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    Last
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div>No customer data available.</div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <CustomerDetail
        customer={customerToDelete}
        showModal={showDeleteModal}
        handleCloseModal={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default CustomersList;
