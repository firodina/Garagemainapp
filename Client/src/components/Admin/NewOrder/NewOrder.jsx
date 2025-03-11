import React, { useState } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
// import Search from "./StepsToOrder/Search";
// import AddOrder from "./StepsToOrder/AddOrder";
// import CompleteOrder from "./StepsToOrder/CompleteOrder";
// import AssignItems from "./StepsToOrder/AssignItems/AssignItems";
import "./NewOrder.css"; // Custom styles

const NewOrder = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedData, setSelectedData] = useState({
//     customer: null,
//     vehicles: [],
//     orderDetails: {},
//   });

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleCustomerSelect = (customer) => {
//     setSelectedData((prevData) => ({ ...prevData, customer }));
//     handleNext(); // Move to Add Vehicle step
//   };

//   const handleProceed = (data) => {
//     setSelectedData((prevData) => ({
//       ...prevData,
//       vehicles: data.vehicles,
//     }));
//     handleNext(); // Move to Complete Order step
//   };

//   const handleOrderDetails = (data) => {
//     setSelectedData((prevData) => ({
//       ...prevData,
//       orderDetails: data,
//     }));
//     handleNext(); // Move to Assign Items step
//   };

//   const handleOrderSubmission = () => {
//     // Handle order submission logic here
//     alert("Order Submitted Successfully!");
//   };

//   const steps = [
//     {
//       name: "Search",
//       component: <Search onCustomerSelect={handleCustomerSelect} />,
//     },
//     {
//       name: "Add Vehicle",
//       component: (
//         <AddOrder customer={selectedData.customer} onProceed={handleProceed} />
//       ),
//     },
//     {
//       name: "Add Services",
//       component: (
//         <CompleteOrder
//           customer={selectedData.customer}
//           vehicles={selectedData.vehicles}
//           onSubmit={handleOrderDetails}
//         />
//       ),
//     },
//     {
//       name: "Submit Order",
//       component: (
//         <AssignItems
//           customer={selectedData.customer}
//           vehicles={selectedData.vehicles}
//           orderDetails={selectedData.orderDetails}
//         />
//       ),
//     },
//   ];

  return (
    <Container className="my-4 full-height">
      <div className="step-container">
        <Row className="text-center mb-4">
          {/* {steps.map((step, index) => ( */}
            <Col  className="d-flex flex-column align-items-center">
            {/* key={index} */}
              <div
                className={`circle ${
                  index <= currentStep
                    ? "bg-success text-white"
                    : "bg-light text-muted"
                } rounded-circle d-flex justify-content-center align-items-center`}
                style={{ width: "3rem", height: "3rem", fontSize: "1.25rem" }}
                // aria-label={`Step ${index + 1}: ${step.name}`}
              >
                {/* {index < currentStep ? ( */}
                  <i className="fa fa-check"></i>
                {/* ) : ( */}
                  {/* <span>{index + 1}</span> */}
                {/* )} */}
              </div>

              <div
                className={`label-box ${
                  index <= currentStep
                    ? "text-success font-weight-bold"
                    : "text-muted"
                }`}
              >
                {/* <span className="label-text">{step.name}</span> */}
              </div>
            </Col>
          {/* ))} */}
        </Row>

        {/* <div className="step-content mb-4">{steps[currentStep].component}</div> */}

        <Row className="text-center step-footer">
          <Col>
            <ButtonGroup className="d-flex justify-content-center">
              <Button
                variant="secondary"
                className="me-2"
                size="sm"
                // onClick={handlePrevious}
                // disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                variant="success"
                size="sm"
                // onClick={
                //   currentStep < steps.length - 1
                //     ? handleNext
                //     : handleOrderSubmission
                // }
              >
                {/* {currentStep < steps.length - 1 ? "Next" : "Submit Order"} */}
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default NewOrder;
