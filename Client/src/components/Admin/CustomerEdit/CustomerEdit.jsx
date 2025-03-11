import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Table } from "react-bootstrap";
// import axios from "axios";
import "./CustomerEdit.css"; // Ensure custom styles for the component
// import AddVehicleForm from "../AddVehicleForm/AddVehicleForm"; // Adjust the path as needed

const CustomerEdit = () => {
//   const { customer_id } = useParams();
//   const [vehicles, setVehicles] = useState([]); // State for vehicles
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   const fetchVehicles = () => {
//     if (customer_id) {
//       setLoading(true);
//       axios
//         .get(`http://localhost:5000/api/vehicles/${customer_id}`)
//         .then((response) => {
//           setVehicles(response.data); // Set the vehicle data
//         })
//         .catch(() => {
//           setError("Failed to fetch vehicles");
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//   }, [customer_id]);

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);

//   if (loading) return <p>Loading vehicles...</p>;
//   if (error) return <p>Error fetching vehicle details</p>;

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Vehicle Information</h2>

      <div className="text-center mb-4">
        <Button variant="success" onClick={handleShow}>
          Add New Vehicle
        </Button>
      </div>

      {vehicles.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Vehicle Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Type</th>
              <th>Mileage</th>
              <th>Serial</th>
              <th>License Plate</th>
            </tr>
          </thead>
          <tbody>
            {/* {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_id}>
                <td>{vehicle.vehicle_make}</td>
                <td>{vehicle.vehicle_model}</td>
                <td>{vehicle.vehicle_year}</td>
                <td>{vehicle.vehicle_color}</td>
                <td>{vehicle.vehicle_type}</td>
                <td>{vehicle.vehicle_mileage}</td>
                <td>{vehicle.vehicle_serial}</td>
                <td>{vehicle.vehicle_tag}</td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      ) : (
        <p>No vehicles associated with this customer.</p>
      )}

      <div className="button-group text-center mt-4">
        <Button
          variant="primary"
        //   onClick={() => navigate(`/admin/customers/edit/${customer_id}`)}
          className="mx-2"
        >
          Edit Customer
        </Button>
      </div>

      {/* Modal for Adding New Vehicle */}
      <AddVehicleForm
        // show={showModal}
        // handleClose={handleClose}
        // customerId={{ customer_id }}
      />
    </Container>
  );
};

export default CustomerEdit;
