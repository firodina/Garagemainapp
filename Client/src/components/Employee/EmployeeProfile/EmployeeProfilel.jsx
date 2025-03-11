import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import EmployeeService from "../../../../services/employee.service"; // Adjust path as needed
// import { useAuth } from "../../../../Contexts/AuthContext";

function EmployeeProfile() {
//   const [employeeInfo, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { employee } = useAuth();
//   const employeeId = employee.employee_id;

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const data = await EmployeeService.fetchEmployeeById(employeeId);
//         setEmployee(data.data);
//       } catch (error) {
//         setError("Failed to fetch employee data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployeeData();
//   }, [employeeId]);

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

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   if (!employeeInfo) {
//     return <div>No employee data found.</div>;
//   }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">
            <Card.Title className="text-center mb-4 fs-3 fw-bold">
              Employee Profile
            </Card.Title>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={4} className="text-center">
                  <img
                    src= "default-avatar.png"
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      border: "2px solid #007bff", // Blue border for emphasis
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // Soft shadow
                    }}
                  />
                </Col>
                <Col md={8}>
                  <ul className="list-unstyled">
                    <li>
                      <strong className="fs-5">Name:</strong>{" "}
                      {/* {`${employeeInfo.employee_first_name} ${employeeInfo.employee_last_name}`} */}
                    </li>
                    <li>
                      <strong className="fs-5">Email:</strong>{" "}
                      {/* {employeeInfo.employee_email} */}
                    </li>
                    <li>
                      <strong className="fs-5">Phone:</strong>{" "}
                      {/* {employeeInfo.employee_phone} */}
                    </li>
                    <li>
                      <strong className="fs-5">Position:</strong> Employee
                    </li>
                    <li>
                      <strong className="fs-5">Department:</strong> Mechanic
                    </li>
                    <li>
                      <strong className="fs-5">Date of Hire:</strong>{" "}
                      {/* {new Date(employeeInfo.added_date).toLocaleDateString()} */}
                    </li>
                    {/* Add more fields as needed */}
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeProfile;
