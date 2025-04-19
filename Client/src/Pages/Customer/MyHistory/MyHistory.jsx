import React from 'react';
import CustumerMenu from '../../../components/CustomerPage/CustomerMenu/CustumerMenu';
import MyOrders from '../../../components/CustomerPage/CustomerHistory/MyHistory';

function MyHistory() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-800">Order History</h1>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Left Side - Menu */}
        <div className="w-full md:w-64 lg:w-72 bg-white md:min-h-screen">
          <CustumerMenu />
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Order History</h1>
              <p className="text-gray-600 mt-2">View your past orders and their status</p>
            </div>
            <MyOrders/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHistory;