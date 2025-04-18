import React, { useState } from "react";
import { Modal, Button, Alert, Form } from "react-bootstrap";
import employeeService from "../../../Service/employee.service";
import { useAuth } from "../../../Contexts/AuthContext";
import "./AddEmployee.css";

function AddEmployeeForm() {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  const [employee_image, setEmployeeImage] = useState(null);
  const [success, setSuccess] = useState(false); // Added success state
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  const handleImageChange = (event) => {
    setEmployeeImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    // Validation logic
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("employee_email", employee_email);
    formData.append("employee_first_name", employee_first_name || ""); // Ensure not undefined
    formData.append("employee_last_name", employee_last_name || "");
    formData.append("employee_phone", employee_phone || "");
    formData.append("employee_password", employee_password || "");
    formData.append("active_employee", String(active_employee));
    formData.append("company_role_id", company_role_id);

    if (employee_image) {
      formData.append("employee_image", employee_image);
    }

    try {
      const data = await employeeService.createEmployee(formData, loggedInEmployeeToken);
      if (data.error) {
        setServerError(data.error);
        setShowErrorModal(true);
      } else {
        setSuccess(true);
        setServerError("");
        setShowSuccessModal(true);
        setTimeout(() => {
          // Optional: Redirect or clear the form
        }, 2000);
      }
    } catch (error) {
      const resMessage = error.message || "An error occurred";
      setServerError(resMessage);
      setShowErrorModal(true);
    }
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Add a New Employee</h2>
        <Form onSubmit={handleSubmit}>
          {serverError && (
            <Alert variant="danger" onClose={() => setServerError("")} dismissible>
              {serverError}
            </Alert>
          )}
          {success && (
            <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
              Employee added successfully!
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Group className="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={employee_email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Employee email"
                  isInvalid={!!emailError}
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-4">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={employee_first_name}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Employee first name"
                  isInvalid={!!firstNameRequired}
                />
                <Form.Control.Feedback type="invalid">{firstNameRequired}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Group className="mb-4">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={employee_last_name}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Employee last name"
                />
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-4">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={employee_phone}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="Employee phone (555-555-5555)"
                />
              </Form.Group>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Form.Group className="mb-4">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={company_role_id}
                  onChange={(event) => setCompany_role_id(event.target.value)}
                >
                  <option value="1">Employee</option>
                  <option value="2">Manager</option>
                  <option value="3">Admin</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={employee_password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Employee password"
                  isInvalid={!!passwordError}
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-4">
            <Form.Label>Employee Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Button
            className="w-full !bg-red-500 text-white py-2 rounded-md !hover:bg-red-600 transition duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Employee"}
          </Button>
        </Form>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Employee added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{serverError}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default AddEmployeeForm;
