import React, { useEffect, useState } from "react";
import AddVehicleForm from "../components/Admin/Vehicle/AddVehicle/AddVehicleForm";
import AddOrderForm from "../components/Admin/Order/AddOrder/AddOrder"; // Import the AddOrderForm
import { Link, useParams } from "react-router-dom";
import customerService from "../Service/customer.service";
import { useAuth } from "../Contexts/AuthContext";
import { FaRegEdit } from "react-icons/fa";
import CustomerVehicles from "../components/Admin/Customer/CustomerVehicle/CustomerVehicles";

const CustomerPage = () => {
  const { customerId } = useParams();
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const [customer, setCustomer] = useState({});
  const [error, setError] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false); // State for order form visibility

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await customerService.getCustomerById(
          token,
          customerId
        );
        setCustomer(customerData);
      } catch (err) {
        setError(err.message);
      }
    };

    if (token && customerId) {
      fetchCustomer();
    }
  }, [token, customerId]);

  const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
      color: "#222B48",
      padding: "20px 0",
      backgroundColor: "#f5f5f5",
    },
    section: {
      padding: "20px",
      marginBottom: "20px",
      paddingLeft: "30px",
      borderRadius: "8px",
      width: "100%",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    customerName: {
      fontSize: "24px",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    customerInfo: {
      margin: "5px 0",
      fontSize: "16px",
    },
    editButton: {
      border: "none",
      color: "#222B48",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    sectionTitle: {
      fontSize: "20px",
      marginBottom: "10px",
      fontWeight: "bold",
      paddingLeft: "30px",
    },
    sidebar: {
      marginRight: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    sidebarCircle: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#e74c3c",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      margin: "40px 40px 0 0",
    },
    actionButton: {
      backgroundColor: "#222B48",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "10px",
      marginBottom: "10px",
    },
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div style={styles.page}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={styles.sidebar}>{/* Sidebar circles */}</div>

        <div style={{ flexGrow: 1 }}>
          {/* Customer Information Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Info</div>
            <div style={styles.section}>
              <h2 style={styles.customerName}>
                Customer: {customer.first_name} {customer.last_name}
              </h2>
              <p style={styles.customerInfo}>
                <strong>Email:</strong> {customer.email}
              </p>
              <p style={styles.customerInfo}>
                <strong>Phone Number:</strong> {customer.phone}
              </p>
              <p style={styles.customerInfo}>
                <strong>Approved:</strong> {customer.approved ? "Yes" : "No"}
              </p>

              <Link
                to={`/admin/customer/${customerId}`}
                style={styles.editButton}
              >
                Edit customer info {<FaRegEdit color="red" />}
              </Link>
            </div>
          </div>

          {/* Vehicles Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Cars</div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                Vehicles of {customer.first_name}
              </h3>
              <AddVehicleForm customerId={customerId} />
              <div style={{ marginTop: "20px" }}>
                <CustomerVehicles customerId={customerId} />
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="d-flex">
            <div style={styles.sidebarCircle}>Orders</div>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                Orders for {customer.first_name}
              </h3>
              <button
                style={styles.actionButton}
                onClick={() => setShowOrderForm(true)}
              >
                Create New Order
              </button>

              {showOrderForm && (
                <AddOrderForm
                  customer_id={customerId}
                  onCancel={() => setShowOrderForm(false)}
                  onSuccess={() => {
                    setShowOrderForm(false);
                    // You might want to refresh orders list here
                  }}
                />
              )}

              {/* You might want to add a component to display existing orders here */}
              {/* <CustomerOrders customerId={customerId} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
