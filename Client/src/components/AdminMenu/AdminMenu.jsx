import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaPlus,
  FaUserPlus,
  FaUsers,
  FaUser,
  FaCog,
  FaTools,
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import "./adminmenu.css";

function AdminMenu() {
  // State to manage the visibility of the services, orders, employees, customers, and items sub-menus
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isItemsOpen, setIsItemsOpen] = useState(false); // State for items menu

  // Function to toggle the services sub-menu
  const toggleServicesMenu = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Function to toggle the orders sub-menu
  const toggleOrdersMenu = () => {
    setIsOrdersOpen(!isOrdersOpen);
  };

  // Function to toggle the employees sub-menu
  const toggleEmployeesMenu = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

  // Function to toggle the customers sub-menu
  const toggleCustomersMenu = () => {
    setIsCustomersOpen(!isCustomersOpen);
  };

  // Function to toggle the items sub-menu
  const toggleItemsMenu = () => {
    setIsItemsOpen(!isItemsOpen);
  };

  return (
    <div className="admin-menu">
      <h2>Admin Menu</h2>
      <div className="list-group">
        <Link to="/admin" className="list-group-item">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>

        {/* Orders menu item with toggle functionality */}
        <div className="list-group-item" onClick={toggleOrdersMenu}>
          <FaBox className="icon" /> Orders
          <span className="expand-icon">
            {isOrdersOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {/* Conditional rendering of orders sub-menu items */}
        {isOrdersOpen && (
          <div className="sub-menu">
            <Link to="/admin/new-order" className="list-group-item">
              <FaUserPlus className="icon" /> New Order
            </Link>
            <Link to="/admin/orders" className="list-group-item">
              <FaUser className="icon" /> View Orders
            </Link>
          </div>
        )}

        {/* Employees menu item with toggle functionality */}
        <div className="list-group-item" onClick={toggleEmployeesMenu}>
          <FaUsers className="icon" /> Employees
          <span className="expand-icon">
            {isEmployeesOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {/* Conditional rendering of employees sub-menu items */}
        {isEmployeesOpen && (
          <div className="sub-menu">
            <Link to="/admin/add-employee" className="list-group-item">
              <FaUserPlus className="icon" /> Add Employee
            </Link>
            <Link to="/admin/employees" className="list-group-item">
              <FaUser className="icon" /> View Employees
            </Link>
          </div>
        )}

        {/* Services menu item with toggle functionality */}
        <div className="list-group-item" onClick={toggleServicesMenu}>
          <FaTools className="icon" /> Services
          <span className="expand-icon">
            {isServicesOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {/* Conditional rendering of services sub-menu items */}
        {isServicesOpen && (
          <div className="sub-menu">
            <Link to="/admin/services/add" className="list-group-item">
              <FaPlus className="icon" /> Add Service
            </Link>
            <Link to="/admin/services/view" className="list-group-item">
              <FaCog className="icon" /> View Services
            </Link>
          </div>
        )}

        {/* Customers menu item with toggle functionality */}
        <div className="list-group-item" onClick={toggleCustomersMenu}>
          <FaUsers className="icon" /> Customers
          <span className="expand-icon">
            {isCustomersOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {/* Conditional rendering of customers sub-menu items */}
        {isCustomersOpen && (
          <div className="sub-menu">
            <Link to="/admin/add_customer" className="list-group-item">
              <FaPlus className="icon" /> Add Customer
            </Link>
            <Link to="/admin/customers" className="list-group-item">
              <FaCog className="icon" /> View Customers
            </Link>
          </div>
        )}

        {/* Items menu item with toggle functionality */}
        <div className="list-group-item" onClick={toggleItemsMenu}>
          <FaBox className="icon" /> Items
          <span className="expand-icon">
            {isItemsOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {/* Conditional rendering of items sub-menu items */}
        {isItemsOpen && (
          <div className="sub-menu">
            <Link to="/admin/add-item" className="list-group-item">
              <FaPlus className="icon" /> Add Item
            </Link>
            <Link to="/admin/items" className="list-group-item">
              <FaCog className="icon" /> View Items
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMenu;
