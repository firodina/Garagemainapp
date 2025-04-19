import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddVehicleForm from "../../Vehicle/AddVehicle/AddVehicleForm";
import AddOrderForm from "../../Order/AddOrder/AddOrder";

const CustomerDetail = ({
  customer,
  showModal,
  handleCloseModal,
  handleDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const navigate = useNavigate();

  const handleShowDeleteConfirmation = () => setIsDeleting(true);
  const handleCancelDelete = () => setIsDeleting(false);

  const handleDeleteClick = () => {
    handleDelete(customer?.customer_id);
    handleCloseModal();
  };

  const handleAddVehicle = () => {
    setIsAddingVehicle(true);
  };

  const handleCancelAddVehicle = () => {
    setIsAddingVehicle(false);
  };

  const handleAddOrder = () => {
    setIsAddingOrder(true);
  };

  const handleCancelAddOrder = () => {
    setIsAddingOrder(false);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton className="border-b border-gray-200">
        <Modal.Title className="text-xl font-semibold text-gray-800">
          Customer Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Basic Information Section */}
          <div className="w-full md:w-1/2">
            <h5 className="text-lg font-medium text-gray-700">Basic Information</h5>
            <hr className="my-2 border-gray-300" />
            <div className="space-y-2">
              <p className="text-sm md:text-base">
                <span className="font-semibold text-gray-600">Customer ID:</span>{" "}
                <span className="text-gray-800">{customer?.customer_id}</span>
              </p>
              <p className="text-sm md:text-base">
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                <span className="text-gray-800">
                  {customer?.first_name} {customer?.last_name}
                </span>
              </p>
              <p className="text-sm md:text-base">
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                <span className="text-gray-800">{customer?.email}</span>
              </p>
              <p className="text-sm md:text-base">
                <span className="font-semibold text-gray-600">Phone:</span>{" "}
                <span className="text-gray-800">{customer?.phone}</span>
              </p>
              <p className="text-sm md:text-base">
                <span className="font-semibold text-gray-600">Status:</span>{" "}
                <span className={customer?.active_customer_status ? "text-green-600" : "text-red-600"}>
                  {customer?.active_customer_status ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>

          {/* Vehicle and Order Management Section */}
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <h5 className="text-lg font-medium text-gray-700">Vehicle Management</h5>
              <hr className="my-2 border-gray-300" />
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full py-2 text-sm md:text-base"
                  onClick={handleAddVehicle}
                >
                  Add New Vehicle
                </Button>
                <Button
                  variant="info"
                  className="w-full py-2 text-sm md:text-base"
                  onClick={() => navigate(`/customers/${customer.customer_id}/vehicles`)}
                >
                  View Vehicles
                </Button>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-medium text-gray-700">Order Management</h5>
              <hr className="my-2 border-gray-300" />
              <div className="space-y-3">
                <Button
                  variant="success"
                  className="w-full py-2 text-sm md:text-base"
                  onClick={handleAddOrder}
                >
                  Create New Order
                </Button>
                <Button
                  variant="info"
                  className="w-full py-2 text-sm md:text-base"
                  onClick={() => navigate(`/customers/${customer.customer_id}/orders`)}
                >
                  View Orders
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Forms */}
        {isAddingVehicle && (
          <div className="mt-4">
            <AddVehicleForm
              customer_id={customer.customer_id}
              onCancel={handleCancelAddVehicle}
            />
          </div>
        )}

        {isAddingOrder && (
          <div className="mt-4">
            <AddOrderForm
              customer_id={customer.customer_id}
              onCancel={handleCancelAddOrder}
            />
          </div>
        )}

        {/* Delete Confirmation */}
        {isDeleting && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h6 className="text-lg font-medium text-gray-800">Confirm Deletion</h6>
            <p className="text-gray-600 mb-3">Are you sure you want to delete this customer?</p>
            <div className="space-y-1 text-sm md:text-base">
              <p>
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                <span className="text-gray-800">
                  {customer?.first_name} {customer?.last_name}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Email:</span>{" "}
                <span className="text-gray-800">{customer?.email}</span>
              </p>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="border-t border-gray-200 px-4 py-3">
        <Button variant="secondary" onClick={handleCloseModal} className="px-4 py-2">
          Close
        </Button>

        {!isDeleting ? (
          <Button variant="danger" onClick={handleShowDeleteConfirmation} className="px-4 py-2">
            Delete Customer
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline-secondary" onClick={handleCancelDelete} className="px-4 py-2">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteClick} className="px-4 py-2">
              Confirm Delete
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetail;