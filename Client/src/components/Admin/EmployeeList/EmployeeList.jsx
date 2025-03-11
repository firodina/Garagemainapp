import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Toast,
  InputGroup,
  FormControl,
  Pagination,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
// import { format } from "date-fns";
import { FaEdit, FaTrash, FaPrint, FaEye, FaKey } from "react-icons/fa";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import employeeService from "../../../../services/employee.service";
import "./EmployeeList.css";

// const roleLabels = {
//   1: "Employee",
//   2: "Manager",
//   3: "Admin",
// };

// const statusLabels = {
//   1: "Active",
//   0: "Inactive",
// };

const EmployeesList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [apiError, setApiError] = useState(false);
//   const [apiErrorMessage, setApiErrorMessage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showPrintModal, setShowPrintModal] = useState(false);
//   const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
//   const [currentEmployee, setCurrentEmployee] = useState(null);
//   const [employeeToDelete, setEmployeeToDelete] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [employeeIdToPrint, setEmployeeIdToPrint] = useState(null);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastVariant, setToastVariant] = useState("success");
//   const [password, setPassword] = useState("");

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [employeesPerPage] = useState(5);

//   const { employee, isAdmin } = useAuth();
//   const token = employee ? employee.employee_token : null;

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await employeeService.getAllEmployees(token);
//         if (res.status !== "success") {
//           throw new Error(res.message);
//         }
//         setEmployees(res.data);
//       } catch (err) {
//         setApiError(true);
//         if (err.message === "401") {
//           setApiErrorMessage("Please login again");
//         } else if (err.message === "403") {
//           setApiErrorMessage("You are not authorized to view this page");
//         } else {
//           setApiErrorMessage("Please try again later");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, [token]);

//   useEffect(() => {
//     const filterEmployees = () => {
//       if (searchQuery === "") {
//         setFilteredEmployees(employees);
//       } else {
//         setFilteredEmployees(
//           employees.filter((emp) =>
//             [
//               emp.employee_first_name,
//               emp.employee_last_name,
//               emp.employee_email,
//               emp.employee_phone,
//               roleLabels[emp.company_role_id],
//               statusLabels[emp.status],
//             ]
//               .join(" ")
//               .toLowerCase()
//               .includes(searchQuery.toLowerCase())
//           )
//         );
//       }
//     };

//     filterEmployees();
//   }, [searchQuery, employees]);

//   // Pagination logic
//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = filteredEmployees.slice(
//     indexOfFirstEmployee,
//     indexOfLastEmployee
//   );

//   const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const generateEmployeeId = (employee) => {
//     return `${employee.employee_id}-${Date.now()}`;
//   };

//   const handlePrintId = (employee) => {
//     const id = generateEmployeeId(employee);
//     setEmployeeIdToPrint(id);
//     setCurrentEmployee(employee);
//     setShowPrintModal(true);
//   };

//   const handleConfirmPrint = () => {
//     const printWindow = window.open("", "", "height=600,width=800");
//     printWindow.document.write(
//       "<html><head><title>Employee ID</title></head><body>"
//     );
//     printWindow.document.write(
//       `<h1>Employee ID</h1>
//       <p><strong>Full Name:</strong> ${currentEmployee.employee_first_name} ${
//         currentEmployee.employee_last_name
//       }</p>
//       <p><strong>Email:</strong> ${currentEmployee.employee_email}</p>
//       <p><strong>Role:</strong> ${
//         roleLabels[currentEmployee.company_role_id]
//       }</p>
//       <p><strong>Phone Number:</strong> ${currentEmployee.employee_phone}</p>
//       <p><strong>Added Date:</strong> ${format(
//         new Date(currentEmployee.added_date),
//         "MM-dd-yyyy | HH:mm"
//       )}</p>
//       <p>${employeeIdToPrint}</p>`
//     );
//     printWindow.document.write("</body></html>");
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   const handleEditClick = (employee) => {
//     setCurrentEmployee(employee);
//     setShowEmployeeModal(true);
//   };

//   const handleDeleteClick = (employee) => {
//     setEmployeeToDelete(employee);
//     setShowDeleteConfirm(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await employeeService.deleteEmployee(employeeToDelete.employee_id, token);
//       setEmployees(
//         employees.filter(
//           (emp) => emp.employee_id !== employeeToDelete.employee_id
//         )
//       );
//       setFilteredEmployees(
//         filteredEmployees.filter(
//           (emp) => emp.employee_id !== employeeToDelete.employee_id
//         )
//       );
//       setToastMessage("Employee deleted successfully");
//       setToastVariant("success");
//       setShowToast(true);
//     } catch (err) {
//       setToastMessage("Failed to delete employee");
//       setToastVariant("danger");
//       setShowToast(true);
//     } finally {
//       setShowDeleteConfirm(false);
//       setTimeout(() => setShowToast(false), 2000);
//     }
//   };

//   const handleSaveChanges = async () => {
//     const formData = new FormData();
//     formData.append("employee_first_name", currentEmployee.employee_first_name);
//     formData.append("employee_last_name", currentEmployee.employee_last_name);
//     formData.append("employee_email", currentEmployee.employee_email);
//     formData.append("employee_phone", currentEmployee.employee_phone);
//     formData.append("company_role_id", currentEmployee.company_role_id);
//     formData.append("employee_id", currentEmployee.employee_id); // Ensure this is a number

//     try {
//       const res = await employeeService.updateEmployee(currentEmployee, token);
//       if (!res.ok) {
//         throw new Error(res.status);
//       }
//       setEmployees(
//         employees.map((emp) =>
//           emp.employee_id === currentEmployee.employee_id
//             ? currentEmployee
//             : emp
//         )
//       );
//       setToastMessage("Employee updated successfully");
//       setToastVariant("success");
//       setShowToast(true);
//     } catch (err) {
//       setToastMessage("Failed to update employee");
//       setToastVariant("danger");
//       setShowToast(true);
//     } finally {
//       setShowEmployeeModal(false);
//       setTimeout(() => setShowToast(false), 2000);
//     }
//   };

//   const handlePasswordReset = async () => {
//     try {
//       await employeeService.resetEmployeePassword(
//         currentEmployee.employee_id,
//         token
//       );
//       setToastMessage("Password reset successfully");
//       setToastVariant("success");
//       setShowToast(true);
//     } catch (err) {
//       setToastMessage("Failed to reset password");
//       setToastVariant("danger");
//       setShowToast(true);
//     } finally {
//       setShowPasswordResetModal(false);
//       setPassword("");
//       setTimeout(() => setShowToast(false), 2000);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       setCurrentEmployee({
//         ...currentEmployee,
//         imageFile: e.target.files[0],
//       });
//     }
//   };

//   const employeePopover = (employee) => (
//     <Popover id={`popover-${employee.employee_id}`} placement="left">
//       <Popover.Header as="h3">Employee Details</Popover.Header>
//       <Popover.Body>
//         <div className="employee-popover">
//           <img
//             src={employee.employee_image}
//             alt={employee.employee_first_name}
//             className="employee-image-popover"
//           />
//           <div className="employee-popover-details">
//             <p>
//               <strong>Full Name:</strong> {employee.employee_first_name}{" "}
//               {employee.employee_last_name}
//             </p>
//             <p>
//               <strong>Email:</strong> {employee.employee_email}
//             </p>
//             <p>
//               <strong>Role:</strong>{" "}
//               {roleLabels[employee.company_role_id] || "Unknown"}
//             </p>
//             <p>
//               <strong>Phone Number:</strong> {employee.employee_phone}
//             </p>
//             <p>
//               <strong>Added Date:</strong>{" "}
//               {format(new Date(employee.added_date), "MM-dd-yyyy | HH:mm")}
//             </p>
//             <p>
//               <strong>Status:</strong> {statusLabels[employee.status]}
//             </p>
//           </div>
//         </div>
//       </Popover.Body>
//     </Popover>
//   );
//   console.log(employee);
  return (
    <div className="employee-list">
      {/* {apiError && ( */}
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          {/* <p>{apiErrorMessage}</p> */}
        </Alert>
      {/* )} */}

      {/* {loading ? ( */}
        <Spinner animation="border" />
      {/* ) : ( */}
        <>
          <div className="title-container">
            <h1 className="title">Employee List</h1>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                // value={searchQuery}
                // onChange={handleSearchChange}
              />
            </InputGroup>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {currentEmployees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>{employee.employee_first_name}</td>
                  <td>{employee.employee_last_name}</td>
                  <td>{employee.employee_email}</td>
                  <td>{employee.employee_phone}</td>
                  <td>{roleLabels[employee.company_role_id]}</td>
                  <td>{statusLabels[employee.active_employee]}</td> */}

                  <td>
                    {/* {isAdmin ? ( */}
                      <>
                        <Button
                          variant="warning"
                          className="me-2"
                        //   onClick={() => handleEditClick(employee)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          className="me-2"
                        //   onClick={() => handleDeleteClick(employee)}
                        >
                          <FaTrash />
                        </Button>
                      </>
                    {/* ) : null} */}
                    <OverlayTrigger
                      trigger="click"
                      placement="left"
                    //   overlay={employeePopover(employee)}
                    >
                      <Button variant="info" className="me-2">
                        <FaEye />
                      </Button>
                    </OverlayTrigger>
                    <Button
                      variant="secondary"
                      className="me-2"
                    //   onClick={() => handlePrintId(employee)}
                    >
                      <FaPrint />
                    </Button>
                    <Button
                      variant="primary"
                      className="me-2"
                    //   onClick={() => {
                    //     setCurrentEmployee(employee);
                    //     setShowPasswordResetModal(true);
                    //   }}
                    >
                      <FaKey />
                    </Button>
                  </td>
                {/* </tr> */}
              {/* ))} */}
            </tbody>
          </Table>

          <Pagination>
            {/* {[...Array(totalPages).keys()].map((page) => (
              <Pagination.Item
                key={page + 1}
                active={page + 1 === currentPage}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </Pagination.Item>
            ))} */}
          </Pagination>

          {/* Employee Modal */}
          <Modal
            // show={showEmployeeModal}
            // onHide={() => setShowEmployeeModal(false)}
            size="lg"
            dialogClassName="modal-90w"
          >
            <Modal.Header closeButton>
              <Modal.Title>Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="employee-modal-content">
                <div className="employee-modal-image-container">
                  <img
                    // src={currentEmployee?.employee_image}
                    // alt={currentEmployee?.employee_first_name}
                    className="employee-image-modal"
                  />
                </div>
                <Form>
                  <div className="employee-modal-fields">
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        // value={currentEmployee?.employee_first_name || ""}
                        // onChange={(e) =>
                        //   setCurrentEmployee({
                        //     ...currentEmployee,
                        //     employee_first_name: e.target.value,
                        //   })
                        // }
                      />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        // value={currentEmployee?.employee_last_name || ""}
                        // onChange={(e) =>
                        //   setCurrentEmployee({
                        //     ...currentEmployee,
                        //     employee_last_name: e.target.value,
                        //   })
                        // }
                      />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        // value={currentEmployee?.employee_email || ""}
                        // onChange={(e) =>
                        //   setCurrentEmployee({
                        //     ...currentEmployee,
                        //     employee_email: e.target.value,
                        //   })
                        // }
                      />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        // value={currentEmployee?.employee_phone || ""}
                        // onChange={(e) =>
                        //   setCurrentEmployee({
                        //     ...currentEmployee,
                        //     employee_phone: e.target.value,
                        //   })
                        // }
                      />
                    </Form.Group>
                    <Form.Group controlId="formRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        as="select"
                        // value={currentEmployee?.company_role_id || ""}
                        // onChange={(e) =>
                        //   setCurrentEmployee({
                        //     ...currentEmployee,
                        //     company_role_id: parseInt(e.target.value, 10),
                        //   })
                        // }
                      >
                        <option value="">Select Role</option>
                        <option value="">Employee</option>
                        <option value="">Manager</option>
                        <option value="">Admin</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        as="select"
                        // value={currentEmployee?.status || ""}
                        // onChange={(e) =>
                        //   setCurrentEmployee({
                        //     ...currentEmployee,
                        //     status: parseInt(e.target.value, 10),
                        //   })
                        // }
                      >
                        <option value={1}>Active</option>
                        <option value={0}>Inactive</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                // onClick={() => setShowEmployeeModal(false)}
              >
                Close
              </Button>
              <Button variant="primary">
              {/* onClick={handleSaveChanges} */}
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            // show={showDeleteConfirm}
            // onHide={() => setShowDeleteConfirm(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this employee?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                // onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="danger">
              {/* onClick={handleConfirmDelete} */}
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Print Modal */}
          <Modal >
          {/* show={showPrintModal} onHide={() => setShowPrintModal(false)} */}
            <Modal.Header closeButton>
              <Modal.Title>Print Employee ID</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure you want to print the ID for{" "}
                {/* {currentEmployee?.employee_first_name}{" "} */}
                {/* {currentEmployee?.employee_last_name}? */}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                // onClick={() => setShowPrintModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" >
              {/* onClick={handleConfirmPrint} */}
                Print
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Password Reset Modal */}
          <Modal
            // show={showPasswordResetModal}
            // onHide={() => setShowPasswordResetModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                // onClick={() => setShowPasswordResetModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" >
              {/* onClick={handlePasswordReset} */}
                Reset Password
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Toast Notifications */}
          <Toast
            // show={showToast}
            // onClose={() => setShowToast(false)}
            delay={3000}
            autohide
            // className={`bg-${toastVariant}`}
          >
            <Toast.Body>toastMessage</Toast.Body>
          </Toast>
        </>
      {/* )} */}
    </div>
  );
};

export default EmployeesList;
