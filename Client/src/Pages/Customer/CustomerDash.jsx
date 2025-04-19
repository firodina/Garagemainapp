import React from "react";
import CustumerMenu from "../../components/CustomerPage/CustomerMenu/CustumerMenu";

function CustomerDash() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header (only shown on small screens) */}
      <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Left Side - Menu */}
        {/* Remove the bg-white and shadow here since CustomerMenu now handles its own styling */}
        <div className="w-full md:w-64 lg:w-72">
          <CustumerMenu/>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
              Welcome to your Dashboard
            </h1>
            <p className="text-base sm:text-lg text-gray-600 text-center leading-relaxed">
              We're delighted to assist you! Here, you'll find detailed
              information about your order, manage your account, and provide
              feedback. Your satisfaction is our priority, and we're here to
              help with any questions or concerns you may have.
            </p>

            {/* Additional Dashboard Content - Example Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Quick Stats Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-gray-700">Active Orders</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">3</p>
              </div>

              {/* Messages Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-gray-700">Unread Messages</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">2</p>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-medium text-gray-700">Recent Activity</h3>
                <p className="text-sm text-gray-500 mt-2">Order #1234 shipped</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDash;