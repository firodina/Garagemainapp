import React, { useState } from "react";
import { format } from "date-fns";
import { Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa"; // Import FaPlus for the '+' icon
// import { useNavigate } from "react-router-dom";

const CustomerDetail = ({
//   customer,
//   showModal,
//   handleCloseModal,
//   handleEdit,
//   handleDelete,
}) => {
//   const navigate = useNavigate();

//   // State to handle "Add Vehicle" modal visibility
//   const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
//   const [newVehicle, setNewVehicle] = useState({
//     make: "",
//     model: "",
//     year: "",
//   });

//   // Handle opening and closing of "Add Vehicle" modal
//   const handleShowAddVehicleModal = () => setShowAddVehicleModal(true);
//   const handleCloseAddVehicleModal = () => setShowAddVehicleModal(false);

//   // Handle form submission for adding vehicle
//   const handleAddVehicleSubmit = (e) => {
//     e.preventDefault();
//     handleCloseAddVehicleModal(); // Close modal after submission
//   };

  return (
    <>
      {/* Customer Details Modal */}
      <Modal >
      {/* show={showModal} onHide={handleCloseModal} */}
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {customer && ( */}
            <>
              <p>
                <strong>Customer ID:</strong> 
                {/* {customer.customer_id} */}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {/* {`${customer.customer_first_name} ${customer.customer_last_name}`} */}
              </p>
              <p>
                <strong>Email:</strong> 
                {/* {customer.customer_email} */}
              </p>
              <p>
                <strong>Phone:</strong> 
                {/* {customer.customer_phone_number} */}
              </p>
              <p>
                <strong>Created Date:</strong>{" "}
                {/* {format(
                //   new Date(customer.customer_added_date),
                  "MM-dd-yyyy | HH:mm"
                )} */}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {/* {customer.active_customer_status === 1 ? "Active" : "Inactive"} */}
              </p>
            </>
          {/* )} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" >
          {/* onClick={handleCloseModal} */}
            Close
          </Button>
          <Button variant="primary" >
          {/* onClick={() => handleEdit(customer)} */}
            Edit
          </Button>
          <Button variant="danger" >
          {/* onClick={() => handleDelete(customer)} */}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Vehicle Button with Circle */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: "1000",
        }}
      >
        <Button
          variant="primary"
        //   onClick={handleShowAddVehicleModal}
          style={{
            borderRadius: "50%", // Circular button
            width: "60px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaPlus style={{ fontSize: "24px", color: "white" }} /> {/* + Icon */}
        </Button>
      </div>

      {/* Add Vehicle Modal */}
      <Modal >
      {/* show={showAddVehicleModal} onHide={handleCloseAddVehicleModal} */}
        <Modal.Header closeButton>
          <Modal.Title>Add Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
          {/* onSubmit={handleAddVehicleSubmit} */}
            <Form.Group controlId="vehicleMake">
              <Form.Label>Make</Form.Label>
              <Form.Control
                type="text"
                // value={newVehicle.make}
                // onChange={(e) =>
                //   setNewVehicle({ ...newVehicle, make: e.target.value })
                // }
                required
              />
            </Form.Group>
            <Form.Group controlId="vehicleModel" className="mt-2">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                // value={newVehicle.model}
                // onChange={(e) =>
                //   setNewVehicle({ ...newVehicle, model: e.target.value })
                // }
                required
              />
            </Form.Group>
            <Form.Group controlId="vehicleYear" className="mt-2">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                // value={newVehicle.year}
                // onChange={(e) =>
                //   setNewVehicle({ ...newVehicle, year: e.target.value })
                // }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Vehicle
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomerDetail;
