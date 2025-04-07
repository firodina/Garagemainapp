import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTasks,
  FaUser,
  FaCog,
  FaEnvelope,
  FaHistory,
} from "react-icons/fa";

function EmployeeMenu() {
  return (
    <div className="w-full md:w-64 bg-gray-800 text-white h-screen   top-20 overflow-y-auto">
      {/* Menu Header */}
      <h2 className="!text-xl font-bold  !text-white p-4 border-b border-gray-700">Employee Menu</h2>
      
      {/* Menu Items */}
      <div className="flex flex-col space-y-1 p-2">
        <Link 
          to="/employee" 
          className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          <FaTachometerAlt className="mr-3" /> Dashboard
        </Link>
        
        <Link 
          to="/employee/tasks" 
          className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          <FaTasks className="mr-3" /> My Tasks
        </Link>
        
        <Link 
          to="/employee/task-history" 
          className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          <FaHistory className="mr-3" /> Task History
        </Link>
        
        <Link 
          to="/employee/profile" 
          className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          <FaUser className="mr-3" /> Profile
        </Link>
        
        <Link 
          to="/employee/settings" 
          className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          <FaCog className="mr-3" /> Settings
        </Link>
        
        <Link 
          to="/employee/messages" 
          className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          <FaEnvelope className="mr-3" /> Messages
        </Link>
      </div>
    </div>
  );
}

export default EmployeeMenu;