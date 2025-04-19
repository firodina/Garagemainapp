import React from 'react';
import CustumerMenu from '../../../components/CustomerPage/CustomerMenu/CustumerMenu';
import MyOrders from '../../../components/CustomerPage/CustomerHistory/MyHistory';

function MyOrderList() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">My Orders</h1>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Left Side - Menu */}
        <div className="w-full md:w-64 lg:w-72">
          <CustumerMenu />
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrderList;