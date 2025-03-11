import React from "react";
import CustumerMenu from "../../components/CustomerPage/CustomerMenu/CustumerMenu";

function CustomerDash() {
  const styles = {
    title: {
      fontSize: "2.5em",
      color: "#333",
      textAlign: "center",
      marginBottom: "20px",
    },
    description: {
      fontSize: "1.2em",
      color: "#555",
      textAlign: "center",
      lineHeight: "1.6",
      maxWidth: "800px",
      margin: "0 auto",
    },
  };
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <CustumerMenu/>
          </div>
          <div className="col-md-9 admin-right-side">
            <h1 style={styles.title}>Welcome to your Dashboard</h1>
            <p style={styles.description}>
              We're delighted to assist you! Here, you'll find detailed
              information about your order, manage your account, and provide
              feedback. Your satisfaction is our priority, and we're here to
              help with any questions or concerns you may have.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDash;
