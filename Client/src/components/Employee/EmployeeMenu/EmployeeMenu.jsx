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
import "./Employee.css"; // Assuming you have a separate CSS file for styling

function EmployeeMenu() {
  return (
    <div className="employee-menu">
      <h2>Employee Menu</h2>
      <div className="list-group">
        <Link to="/employee" className="list-group-item">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>
        <Link to="/employee/tasks" className="list-group-item">
          <FaTasks className="icon" /> My Tasks
        </Link>
        <Link to="/employee/task-history" className="list-group-item">
          <FaHistory className="icon" /> Task History
        </Link>

        <Link to="/employee/profile" className="list-group-item">
          <FaUser className="icon" /> Profile
        </Link>
        <Link to="/employee/settings" className="list-group-item">
          <FaCog className="icon" /> Settings
        </Link>
        <Link to="/employee/messages" className="list-group-item">
          <FaEnvelope className="icon" /> Messages
        </Link>
      </div>
    </div>
  );
}

export default EmployeeMenu;
