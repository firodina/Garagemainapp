import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

function EmployeeDashboard() {
  const { employee } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-1/2">
            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 transition-all duration-300 hover:shadow-lg">
              <div className="p-6 sm:p-8 text-center">
                <div className="flex justify-center">
                  <FaRegSmile className="text-5xl text-yellow-400 mb-4" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Welcome, {employee ? `${employee.employee_first_name}` : "Employee"}!
                </h2>
                <p className="text-gray-600 mb-6">
                  We're excited to have you. Here is your dashboard.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/employee/tasks" 
                    className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    View Orders
                  </Link>
                  <button
                    className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Manage Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Additional content can go here */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Tasks</h3>
                <p className="text-gray-600">You have 5 pending tasks</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Messages</h3>
                <p className="text-gray-600">3 unread messages</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;