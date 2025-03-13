// src/OrderProcess.js
import React, { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";

const OrderProcess = () => {
//   const [step, setStep] = useState(1);
//   const [customer, setCustomer] = useState("");
//   const [vehicle, setVehicle] = useState("");
//   const [employee, setEmployee] = useState("");

//   const handleNextStep = () => {
//     setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     setStep(step - 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     alert("Order Submitted!");
//   };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h3>Order Process</h3>
        </Card.Header>
        <Card.Body>
          {/* {step === 1 && ( */}
            <Form>
              <Form.Group controlId="formCustomer">
                <Form.Label>Search Customer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                //   value={customer}
                //   onChange={(e) => setCustomer(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary">
              {/* onClick={handleNextStep} */}
                Next
              </Button>
            </Form>
          {/* )} */}
          {/* {step === 2 && ( */}
            <Form>
              <Form.Group controlId="formVehicle">
                <Form.Label>Add Vehicle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter vehicle details"
                //   value={vehicle}
                //   onChange={(e) => setVehicle(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" >
              {/* onClick={handlePreviousStep} */}
                Previous
              </Button>
              <Button variant="primary" >
              {/* onClick={handleNextStep} */}
                Next
              </Button>
            </Form>
          {/* )} */}
          {/* {step === 3 && ( */}
            <Form >
            {/* onSubmit={handleSubmit} */}
              <Form.Group controlId="formEmployee">
                <Form.Label>Assign Employee</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter employee name"
                //   value={employee}
                //   onChange={(e) => setEmployee(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" >
              {/* onClick={handlePreviousStep} */}
                Previous
              </Button>
              <Button variant="primary" type="submit">
                Submit Order
              </Button>
            </Form>
          {/* )} */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderProcess;
