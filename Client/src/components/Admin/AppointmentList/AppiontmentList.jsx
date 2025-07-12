import React, { useEffect, useState } from "react";
import appointmentService from "../../../Service/appointment";
import { Spinner, Alert, Table } from "react-bootstrap";
import { useAuth } from "../../../Contexts/AuthContext";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { employee } = useAuth(); // Directly access employee from AuthContext

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = employee?.employee_token; // Get token directly from employee object
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const appointmentsData = await appointmentService.getAllAppointments(token);
        setAppointments(appointmentsData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [employee]); // Depend on employee to re-fetch if it changes

  return (
    <div>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Customer ID</th>
              <th>Service Type</th>
              <th>Vehicle Type</th>
              <th>Service Date</th>
              <th>Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.customer_id}</td>
                <td>{appointment.service_type_id}</td>
                <td>{appointment.vehicle_type_id}</td>
                <td>{appointment.service_date}</td>
                <td>{appointment.time_slot}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminAppointments;