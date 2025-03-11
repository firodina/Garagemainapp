import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaPlus,
  FaUserPlus,
  FaUsers,
  FaUser,
  FaCog,
  FaConciergeBell,
  FaNewspaper, // Added icon for news
} from "react-icons/fa";
import "./Manager.css";

function ManagerMenu() {
  return (
    <div className="admin-menu">
      <h2>Manager Menu</h2>
      <div className="list-group">
        <Link to="/manager" className="list-group-item">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>
        <Link to="/manager/orders" className="list-group-item">
          <FaBox className="icon" /> Orders
        </Link>
        <Link to="/manager/new-order" className="list-group-item">
          <FaPlus className="icon" /> New Order
        </Link>
        <Link to="/manager/employees" className="list-group-item">
          <FaUsers className="icon" /> Employees
        </Link>
        <Link to="/manager/add-customer" className="list-group-item">
          <FaUserPlus className="icon" /> Add Customer
        </Link>
        <Link to="/manager/customers" className="list-group-item">
          <FaUser className="icon" /> Customers
        </Link>
        <Link to="/manager/services" className="list-group-item">
          <FaConciergeBell className="icon" /> Services
        </Link>
        <Link to="/manager/add-news" className="list-group-item">
          <FaNewspaper className="icon" /> Add News
        </Link>
      </div>
    </div>
  );
}

export default ManagerMenu;
