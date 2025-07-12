import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner, Card, Container, Row, Col } from "react-bootstrap";
import serviceService from "../../Service/service.service";
import vehicleService from "../../Service/vehicle.service";
import appointmentService from "../../Service/appointment";
import { useAuth } from "../../Contexts/AuthContext";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    service_id: "",
    vehicle_type_id: "",
    preferred_date: "",
    slot_time: "",
  });

  const [services, setServices] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { customer } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, vehicleRes] = await Promise.all([
          serviceService.getAllServices(),
          vehicleService.getAllVehicleTypes(),
        ]);
        
        console.log("Fetched services:", serviceRes);
        console.log("Fetched vehicle types:", vehicleRes);
        
        setServices(Array.isArray(serviceRes) ? serviceRes : []);
        setVehicleTypes(Array.isArray(vehicleRes) ? vehicleRes : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load service or vehicle data.");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    const serviceTypeId = parseInt(formData.service_id, 10);
    const vehicleTypeId = parseInt(formData.vehicle_type_id, 10);
    const preferredDate = formData.preferred_date; // YYYY-MM-DD
    const timeSlot = formData.slot_time; // HH:MM:SS

    if (
      isNaN(serviceTypeId) ||
      isNaN(vehicleTypeId) ||
      !preferredDate ||
      !timeSlot
    ) {
      setError("All fields must be filled correctly.");
      setLoading(false);
      return;
    }

    // Combine date and time into the expected format "YYYY-MM-DD HH:MM:SS"
    const formattedServiceDate = `${preferredDate} ${timeSlot}`;

    const appointmentPayload = {
      customerId: customer.customer_id, // Adjusted property name
      serviceDate: formattedServiceDate, // Adjusted property name
      timeSlot: timeSlot, // Adjusted property name
      serviceTypeId: serviceTypeId, // Adjusted property name
      vehicleTypeId: vehicleTypeId, // Adjusted property name
    };

    // Log the payload
    console.log("Payload to send:", appointmentPayload);

    try {
      await appointmentService.createAppointment(appointmentPayload);
      setSuccess(true);
      setFormData({
        service_id: "",
        vehicle_type_id: "",
        preferred_date: "",
        slot_time: "",
      });
    } catch (err) {
      console.error("Error creating appointment:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
      setError(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4">Book Appointment</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Appointment booked successfully!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Service</Form.Label>
                  <Form.Select
                    name="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a service</option>
                    {services.length > 0 ? (
                      services.map((s) => (
                        s.service_type_id !== undefined ? (
                          <option key={s.service_type_id} value={s.service_type_id.toString()}>
                            {s.service_name || "Unnamed Service"}
                          </option>
                        ) : null
                      ))
                    ) : (
                      <option disabled>No services available</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Vehicle Type</Form.Label>
                  <Form.Select
                    name="vehicle_type_id"
                    value={formData.vehicle_type_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a vehicle</option>
                    {vehicleTypes.length > 0 ? (
                      vehicleTypes.map((v) => (
                        v.vehicle_type_id !== undefined ? (
                          <option key={v.vehicle_type_id} value={v.vehicle_type_id.toString()}>
                            {v.vehicle_type_name || "Unnamed Vehicle"}
                          </option>
                        ) : null
                      ))
                    ) : (
                      <option disabled>No vehicle types available</option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time Slot</Form.Label>
                  <Form.Control
                    type="time"
                    name="slot_time"
                    value={formData.slot_time}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Book Appointment"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AppointmentForm;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button, Alert, Spinner, Card, Container, Row, Col } from "react-bootstrap";
// import serviceService from "../../Service/service.service";
// import vehicleService from "../../Service/vehicle.service";
// import appointmentService from "../../Service/appointment";
// import { useAuth } from "../../Contexts/AuthContext";

// const AppointmentForm = () => {
//   const [formData, setFormData] = useState({
//     service_id: "",
//     vehicle_id: "",
//     preferred_date: new Date().toISOString().split("T")[0],
//     slot_time: "",
//   });

//   const [services, setServices] = useState([]);
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const { isLogged, customerId, token } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLogged || !customerId || !token) {
//       console.log("User not logged in or no token available.");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const [serviceRes, vehicleRes] = await Promise.all([
//           serviceService.getAllServices(),
//           vehicleService.getVehiclesByCustomerId(token, customerId),
//         ]);

//         console.log("Services Response:", serviceRes);
//         console.log("Vehicles Response:", vehicleRes);

//         setServices(serviceRes);
//         setVehicles(vehicleRes);
//       } catch (err) {
//         console.error("Error fetching data:", err.response ? err.response.data : err.message);
//         setError("Failed to load service or vehicle data. Please try again.");
//       }
//     };

//     fetchData();
//   }, [isLogged, customerId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     setSuccess(false);

//     const serviceTypeId = parseInt(formData.service_id, 10);
//     const vehicleId = parseInt(formData.vehicle_id, 10);
//     const preferredDate = formData.preferred_date;
//     const timeSlot = formData.slot_time;

//     // Validate required fields
//     if (!customerId || isNaN(serviceTypeId) || isNaN(vehicleId) || !preferredDate || !timeSlot) {
//       setError("All fields must be filled correctly.");
//       setLoading(false);
//       return;
//     }

//     const formattedServiceDate = `${preferredDate} ${timeSlot}`;

//     const appointmentPayload = {
//       customerId: customerId,
//       serviceDate: formattedServiceDate, // Combine date and time
//       timeSlot: timeSlot,
//       serviceTypeId: serviceTypeId,
//       vehicleId: vehicleId, // Ensure this matches your backend expectation
//     };

//     console.log("Appointment Payload:", appointmentPayload); // Debugging line

//     try {
//       await appointmentService.createAppointment(appointmentPayload, token);
//       setSuccess(true);
//       setFormData({
//         service_id: "",
//         vehicle_id: "",
//         preferred_date: new Date().toISOString().split("T")[0],
//         slot_time: "",
//       });
//     } catch (err) {
//       console.error("Error creating appointment:", err.response ? err.response.data : err.message);
//       setError(err.response?.data?.error || "Failed to book appointment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!isLogged) {
//       console.log("User is not logged in, redirecting...");
//       const timer = setTimeout(() => {
//         navigate("/login");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isLogged, navigate]);

//   return (
//     <Container className="py-4">
//       <Card className="shadow-sm">
//         <Card.Body>
//           {!isLogged ? (
//             <Alert variant="warning" className="text-center">
//               Please login first to book an appointment. <br />
//               Redirecting you to the login page...
//             </Alert>
//           ) : (
//             <>
//               <Card.Title className="mb-4">Book Appointment</Card.Title>

//               {error && <Alert variant="danger">{error}</Alert>}
//               {success && <Alert variant="success">Appointment booked successfully!</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Select Service</Form.Label>
//                       <Form.Select
//                         name="service_id"
//                         value={formData.service_id}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Choose a service</option>
//                         {services.length > 0 ? (
//                           services.map((s) => (
//                             <option key={s.service_type_id} value={s.service_type_id.toString()}>
//                               {s.service_name || "Unnamed Service"}
//                             </option>
//                           ))
//                         ) : (
//                           <option disabled>No services available</option>
//                         )}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Select Your Vehicle</Form.Label>
//                       <Form.Select
//                         name="vehicle_id"
//                         value={formData.vehicle_id}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Choose your vehicle</option>
//                         {vehicles.length > 0 ? (
//                           vehicles.map((v) => (
//                             <option key={v.vehicle_id} value={v.vehicle_id.toString()}>
//                               {`${v.make} ${v.model} (${v.year}) - ${v.VIN}`}
//                             </option>
//                           ))
//                         ) : (
//                           <option disabled>No vehicles available</option>
//                         )}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Preferred Date</Form.Label>
//                       <Form.Control
//                         type="date"
//                         name="preferred_date"
//                         value={formData.preferred_date}
//                         onChange={handleChange}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={6}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Time Slot</Form.Label>
//                       <Form.Control
//                         type="time"
//                         name="slot_time"
//                         value={formData.slot_time}
//                         onChange={handleChange}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col md={12}>
//                     <Button variant="primary" type="submit" className="w-100" disabled={loading}>
//                       {loading ? <Spinner animation="border" size="sm" /> : "Book Appointment"}
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AppointmentForm;