import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Form,
  Modal,
  Button,
  Pagination,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import serviceService from "../../../../services/service.service";
import { CSSTransition } from "react-transition-group";
import "./servicelist.css";

const ServiceList = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedService, setSelectedService] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [servicesPerPage] = useState(5);
//   const { employee } = useAuth();
//   const loggedInEmployeeToken = employee?.employee_token || "";

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await serviceService.getAllServices(
//           loggedInEmployeeToken
//         );
//         if (response.status === "success") {
//           setServices(response.data || []);
//         } else {
//           throw new Error(response.message || "Failed to fetch services");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, [loggedInEmployeeToken]);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//     setCurrentPage(1);
//   };

//   const handleShowModal = (service, isEditMode) => {
//     setSelectedService(service);
//     setIsEdit(isEditMode);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedService(null);
//     setIsEdit(false);
//   };

//   const handleShowDeleteModal = (service) => {
//     setSelectedService(service);
//     setShowDeleteModal(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//     setSelectedService(null);
//   };

//   const handleEdit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedService = {
//         service_name: e.target.service_name.value,
//         service_description: e.target.service_description.value,
//         service_price: e.target.service_price.value,
//       };

//       const response = await serviceService.updateService(
//         selectedService.service_id,
//         updatedService,
//         loggedInEmployeeToken
//       );

//       if (response.status === "success") {
//         setServices(
//           services.map((service) =>
//             service.service_id === selectedService.service_id
//               ? { ...service, ...updatedService }
//               : service
//           )
//         );
//         handleCloseModal();
//       } else {
//         throw new Error(response.message || "Failed to update service");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await serviceService.deleteService(
//         selectedService.service_id,
//         loggedInEmployeeToken
//       );

//       if (response.status === "success") {
//         setServices(
//           services.filter(
//             (service) => service.service_id !== selectedService.service_id
//           )
//         );
//         handleCloseDeleteModal();
//       } else {
//         throw new Error(response.message || "Failed to delete service");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const filteredServices = services.filter((service) =>
//     service.service_name.toLowerCase().includes(searchQuery)
//   );

//   const indexOfLastService = currentPage * servicesPerPage;
//   const indexOfFirstService = indexOfLastService - servicesPerPage;
//   const currentServices = filteredServices.slice(
//     indexOfFirstService,
//     indexOfLastService
//   );
//   const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Service List</h2>

      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search for services..."
        //   value={searchQuery}
        //   onChange={handleSearch}
          className="mb-4"
          style={{ borderRadius: "20px", borderColor: "#007bff" }}
        />
      </Form.Group>

      {/* {loading ? ( */}
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading services...</p>
        </div>
      {/* ) : error ? (
        <Alert variant="danger">
          <Alert.Heading>Error Fetching Services</Alert.Heading>
          <p></p>
          {error}
        </Alert> */}
      {/* ) : currentServices.length > 0 ? ( */}
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {currentServices.map((service) => ( */}
                <CSSTransition
                //   key={service.service_id}
                  timeout={500}
                  classNames="fade"
                >
                  <tr>
                    {/* <td>{service.service_name}</td> */}
                    <td>
                      {/* {service.service_description.length > 50
                        ? `${service.service_description.substring(0, 50)}...`
                        : service.service_description} */}
                    </td>
                    <td>
                        {/* ${service.service_price} */}
                        </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        // onClick={() => handleShowModal(service, true)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="ml-2"
                        // onClick={() => handleShowDeleteModal(service)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                </CSSTransition>
              {/* ))} */}
            </tbody>
          </Table>

          <Pagination className="justify-content-center mt-4">
            {/* {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))} */}
          </Pagination>
        </>
      {/* ) : ( */}
        <Alert variant="info">No services available at the moment.</Alert>
      {/* )} */}

      {/* {selectedService && ( */}
        <>
          <Modal>
          {/* show={showModal} onHide={handleCloseModal} centered */}
            <Modal.Header>
            {/* closeButton */}
              <Modal.Title>
                {/* {isEdit ? "Edit Service" : "Service Details"} */}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* {isEdit ? ( */}
                <Form >
                {/* onSubmit={handleEdit} */}
                  <Form.Group controlId="service_name">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                    //   defaultValue={selectedService.service_name}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="service_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                    //   defaultValue={selectedService.service_description}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="service_price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                    //   defaultValue={selectedService.service_price}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Form>
              {/* ) : ( */}
                <>
                  {/* <p>{selectedService.service_description}</p> */}
                  <h5 className="text-success">
                    Price: $
                    {/* {selectedService.service_price} */}
                  </h5>
                </>
              {/* )} */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"
            //    onClick={handleCloseModal}
            >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            // show={showDeleteModal}
            // onHide={handleCloseDeleteModal}
            centered
          >
            <Modal.Header >
            {/* closeButton */}
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete the following service?</p>
              <h5 className="text-danger">
                {/* {selectedService.service_name} */}
                service Name
                </h5>
              <p>
                {/* {selectedService.service_description} */}
                Service Descripition
                </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" >
              {/* onClick={handleCloseDeleteModal} */}
                Cancel
              </Button>
              <Button variant="danger" >
              {/* onClick={handleDelete} */}
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      {/* )} */}
    </Container>
  );
};

export default ServiceList;
