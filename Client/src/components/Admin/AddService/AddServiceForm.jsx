import React, { useState, useEffect } from "react";
// import getAuth from "../../../../util/employeeAuthHeader";
import "./AddService.css";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import serviceService from "../../../../services/service.service";
const AddService = () => {
//   const [serviceName, setServiceName] = useState("");
//   const [serviceDescription, setServiceDescription] = useState("");
//   const [servicePrice, setServicePrice] = useState(""); // New state for service price
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   let loggedInEmployeeToken = "";
//   let role = 0;
//   let employeeId = 0;
//   const { employee, isLogged } = useAuth();
//   if (employee && employee.employee_token) {
//     loggedInEmployeeToken = employee.employee_token;
//     role = employee.employee_role;
//     employeeId = employee.employee_id;
//   }
//   // Handle form submission
//   const handleAddService = async (e) => {
//     e.preventDefault();
//     console.log(loggedInEmployeeToken);
//     // Authorization checks
//     if (!isLogged) {
//       alert("You are not authenticated. Please log in.");
//       return;
//     }
//     if (role !== 3) {
//       alert("You do not have permission to add a service.");
//       return;
//     }

//     const serviceData = {
//       service_name: serviceName,
//       service_price: servicePrice, // Ensure the price is an integer parseFloat(servicePrice), // Ensure the price is a number
//       service_description: serviceDescription,
//       createdBy: employeeId,
//       active: 1,
//     };

//     const res = serviceService.addService(serviceData, loggedInEmployeeToken);
//     if (!res) {
//       alert("An error occurred. Please try again later.");
//       return;
//     } else {
//       alert("Service added successfully");
//     }
//   };

//   // Check if the user is authorized to add services
//   useEffect(() => {
//     const checkAuthorization = async () => {
//       const employee = await getAuth();
//       setIsAuthorized(employee && employee.employee_role === 3);
//     };

//     checkAuthorization();
//   }, []);

//   // Render the form only if the user is authorized
//   if (!isAuthorized) {
//     return <div>You are not authorized to add a service.</div>;
//   }

  return (
    <div className="add-service-container">
      <h2 className="add-service-header">
        Add a New Service
        <span className="add-service-underline"></span>
      </h2>
      <form >
      {/* onSubmit={handleAddService} */}
        <div className="add-service-input-group">
          <label htmlFor="serviceName">Service Name:</label>
          <input
            type="text"
            id="serviceName"
            className="add-service-input"
            // value={serviceName}
            // onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </div>
        <div className="add-service-input-group">
          <label htmlFor="servicePrice">Service Price:</label>
          <input
            type="number"
            id="servicePrice"
            className="add-service-input"
            // value={servicePrice}
            // onChange={(e) => setServicePrice(e.target.value)}
            required
          />
        </div>
        <div className="add-service-input-group">
          <label htmlFor="serviceDescription">Service Description:</label>
          <textarea
            id="serviceDescription"
            className="add-service-textarea"
            // value={serviceDescription}
            // onChange={(e) => setServiceDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="add-service-button">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
