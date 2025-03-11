import React, { useState } from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
// import customerService from "../../../../services/customer.service";
// import { useAuth } from "../../../../Contexts/AuthContext";
import "./AddCustomer.css"
import AddVehicleForm from "../AddVehicle/AddVehicleForm";
function AddCustomerForm() {
  // const [customer_email, setEmail] = useState("");
  // const [customer_first_name, setFirstName] = useState("");
  // const [customer_last_name, setLastName] = useState("");
  // const [customer_phone_number, setPhone] = useState("");
  // const [customer_password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  // const [customerId, setCustomerId] = useState(null); // State to store customer ID
  // const { employee } = useAuth();
  // const token = employee ? employee.employee_token : null;

  // const [emailError, setEmailError] = useState("");
  // const [firstNameRequired, setFirstNameRequired] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [success, setSuccess] = useState(false);
  // const [serverError, setServerError] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   let valid = true;

  //   if (!customer_first_name) {
  //     setFirstNameRequired("First name is required");
  //     valid = false;
  //   } else {
  //     setFirstNameRequired("");
  //   }

  //   if (!customer_email) {
  //     setEmailError("Email is required");
  //     valid = false;
  //   } else if (!customer_email.includes("@")) {
  //     setEmailError("Invalid email format");
  //     valid = false;
  //   } else {
  //     const regex = /^\S+@\S+\.\S+$/;
  //     if (!regex.test(customer_email)) {
  //       setEmailError("Invalid email format");
  //       valid = false;
  //     } else {
  //       setEmailError("");
  //     }
  //   }

  //   if (!customer_password) {
  //     setPasswordError("Password is required");
  //     valid = false;
  //   } else if (customer_password.length < 6) {
  //     setPasswordError("Password must be at least 6 characters");
  //     valid = false;
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (!valid) {
  //     setLoading(false);
  //     return;
  //   }

  //   const formData = {
  //     customer_email,
  //     customer_first_name,
  //     customer_last_name,
  //     customer_phone_number,
  //     customer_password,
  //   };

  //   try {
  //     const response = await customerService.createCustomer(formData, token);
  //     if (!response) {
  //       throw new Error("Failed to create customer");
  //     }

  //     const { customer_id } = response;
  //     setCustomerId(customer_id); // Set the customer ID

  //     setSuccess(true);
  //     setServerError("");
  //     setLoading(false);
  //     setTimeout(() => {
  //       setSuccess(false);
  //       setShowVehicleForm(true); // Show the vehicle form
  //     }, 2000);
  //   } catch (error) {
  //     setServerError(error.message);
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <section
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh", margin: "90px 0" }}
      >
        <div
          className="p-4 bg-light rounded shadow-sm"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <h2 className="text-center mb-4">Add a New Customer</h2>
          {/* {serverError && <Alert variant="danger">{serverError}</Alert>}
          {success && !showVehicleForm && (
            <Alert variant="success">Customer added successfully!</Alert>
          )} */}
          <Form >
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Customer Email"
                    // value={customer_email}
                    // onChange={(e) => setEmail(e.target.value)}
                    // isInvalid={!!emailError}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Customer First Name"
                    // value={customer_first_name}
                    // onChange={(e) => setFirstName(e.target.value)}
                    // isInvalid={!!firstNameRequired}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    {firstNameRequired}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Customer Last Name"
                    // value={customer_last_name}
                    // onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Customer Phone (555-555-5555)"
                    // value={customer_phone_number}
                    // onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Customer Password"
                    // value={customer_password}
                    // onChange={(e) => setPassword(e.target.value)}
                    // isInvalid={!!passwordError}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback> */}
                </Form.Group>
              </Col>

              <Col md={12}>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  // disabled={loading}
                >
                  {/* {loading ? "Adding..." : "Add Customer"} */} submit
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </section>

      <AddVehicleForm
        show={showVehicleForm}
        // handleClose={() => setShowVehicleForm(false)}
        // customerId={customerId}
      />
    </>
  );
}

export default AddCustomerForm;
