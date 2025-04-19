import React, { useState, useEffect } from "react";
import orderService from "../../../../Service/customer.service";
import OrderStatusChip from "../OrderStatus/OrderStatusChip";

const statusOptions = ["Pending", "In Progress", "Completed", "Canceled"];

const OrderDetail = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrderById(orderId);
        setOrder(data);
        setStatus(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusChange = async () => {
    setUpdating(true);
    try {
      await orderService.updateOrderStatus(orderId, status);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-md max-w-md mx-auto mt-6">
        Error loading order: {error}
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Order #{order.order_id}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-1">Customer Information</h3>
          <p>{order.first_name} {order.last_name}</p>
          <p className="text-sm text-gray-500">
            Order Date: {new Date(order.order_date).toLocaleString()}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-1">Order Summary</h3>
          <p>Total Price: ${order.total_price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <span className="mr-2">Status:</span>
            <OrderStatusChip status={order.status} />
          </div>
          {order.updated_at && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {new Date(order.updated_at).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div>
        <h3 className="text-xl font-semibold mb-4">Update Status</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button
            className={`px-4 py-2 rounded-md text-white font-medium ${
              updating || status === order.status
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleStatusChange}
            disabled={updating || status === order.status}
          >
            {updating ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              "Update Status"
            )}
          </button>
        </div>
        {updateSuccess && (
          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md">
            Status updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
