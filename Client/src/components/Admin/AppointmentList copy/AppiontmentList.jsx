import React, { useEffect, useState } from "react";
import appointmentService from "../../../Service/appointment"; // Adjust the path as necessary
import serviceService from "../../../Service/service.service"; // Import service service to get service durations
import { Spinner, Alert, Table } from "react-bootstrap";
import { useAuth } from "../../../Contexts/AuthContext";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { employee } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = employee?.employee_token;
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        // Fetch all appointments
        const response = await appointmentService.getAllAppointments(token);
        const appointmentsData = response.appointments || []; // Ensure appointmentsData is an array

        console.log("Appointments Data:", appointmentsData); // Debugging line

        // Fetch all services to get durations
        const servicesData = await serviceService.getAllServices();

        // Create a map of service durations for quick access
        const serviceDurations = {};
        servicesData.forEach(service => {
          serviceDurations[service.service_type_id] = service.duration; // Assuming duration is a field in service
        });

        // Map appointments to include duration
        const appointmentsWithDuration = appointmentsData.map(appointment => ({
          ...appointment,
          duration: serviceDurations[appointment.service_type_id] || 0, // Default to 0 if not found
        }));

        // Sort appointments by duration
        appointmentsWithDuration.sort((a, b) => a.duration - b.duration);

        setAppointments(appointmentsWithDuration);
      } catch (err) {
        console.error("Error fetching appointments:", err); // Log the error for debugging
        setError(err.response?.data?.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [employee]);

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
              <th>Duration (mins)</th> {/* Display duration */}
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.appointment_id}> {/* Ensure the key matches your API response */}
                <td>{appointment.appointment_id}</td>
                <td>{appointment.customer_id}</td>
                <td>{appointment.service_type_id}</td>
                <td>{appointment.vehicle_type_id}</td>
                <td>{appointment.service_date}</td>
                <td>{appointment.time_slot}</td>
                <td>{appointment.duration}</td> {/* Display the calculated duration */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminAppointments;