import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderStatusChip from "../OrderStatus/OrderStatusChip";
import orderService from "../../../../Service/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAllOrders(token);
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">
        Error loading orders: {error}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      {/* Mobile View */}
      <div className="md:hidden">
        {orders.map((order) => (
          <div key={order.order_id} className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">#{order.order_id}</p>
                <p className="text-gray-600">{`${order.first_name} ${order.last_name}`}</p>
              </div>
              <OrderStatusChip status={order.status} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p>{new Date(order.order_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p>${Number(order.total_price).toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-3">
              <Link
                to={`/orders/${order.order_id}`}
                className="inline-block px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet/Desktop View */}
      <table className="hidden md:table w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.order_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{order.order_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {`${order.first_name} ${order.last_name}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.order_date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${Number(order.total_price).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <OrderStatusChip status={order.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  to={`/orders/${order.order_id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
};

export default OrderList;