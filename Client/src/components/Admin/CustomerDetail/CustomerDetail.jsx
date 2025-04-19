import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddVehicleForm from "../Vehicle/AddVehicle/AddVehicleForm";
import AddOrderForm from "../Order/AddOrder/AddOrder";

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

  if (!showModal) return null;

  const handleDeleteClick = () => {
    handleDelete(customer?.customer_id);
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Customer Details</h2>
          <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Basic Information</h3>
              <div className="space-y-1 text-sm text-gray-700">
                <p><strong>Customer ID:</strong> {customer?.customer_id}</p>
                <p><strong>Name:</strong> {customer?.first_name} {customer?.last_name}</p>
                <p><strong>Email:</strong> {customer?.email}</p>
                <p><strong>Phone:</strong> {customer?.phone}</p>
                <p><strong>Status:</strong> {customer?.active_customer_status ? "Active" : "Inactive"}</p>
              </div>
            </div>

            {/* Vehicle and Order Actions */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Vehicle Management</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setIsAddingVehicle(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Add New Vehicle
                </button>
                <button
                  onClick={() => navigate(`/customers/${customer.customer_id}/vehicles`)}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  View Vehicles
                </button>
              </div>

              <h3 className="font-semibold text-lg mt-6 mb-2">Order Management</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setIsAddingOrder(true)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Create New Order
                </button>
                <button
                  onClick={() => navigate(`/customers/${customer.customer_id}/orders`)}
                  className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>

          {/* Add Vehicle Form */}
          {isAddingVehicle && (
            <div className="mt-6">
              <AddVehicleForm
                customer_id={customer.customer_id}
                onCancel={() => setIsAddingVehicle(false)}
              />
            </div>
          )}

          {/* Add Order Form */}
          {isAddingOrder && (
            <div className="mt-6">
              <AddOrderForm
                customer_id={customer.customer_id}
                onCancel={() => setIsAddingOrder(false)}
              />
            </div>
          )}

          {/* Confirm Delete Section */}
          {isDeleting && (
            <div className="bg-yellow-100 p-4 rounded border border-yellow-300">
              <h4 className="font-semibold mb-2">Confirm Deletion</h4>
              <p>Are you sure you want to delete this customer?</p>
              <p>
                <strong>Name:</strong> {customer?.first_name} {customer?.last_name}
              </p>
              <p>
                <strong>Email:</strong> {customer?.email}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
          {!isDeleting ? (
            <button
              onClick={() => setIsDeleting(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Customer
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsDeleting(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteClick}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
