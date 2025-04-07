import { useState } from "react";
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

const AdminMenu = () => {
  // State to manage the visibility of sub-menus
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white   left-0 top-0 overflow-y-auto">
      <h2 className="text-xl font-bold  !text-white p-4 border-b border-gray-700">Admin Menu</h2>
      
      <div className="flex flex-col space-y-1 p-2">
        {/* Dashboard Link */}
        <Link 
          to="/admin" 
          className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          <FaTachometerAlt className="mr-3" /> Dashboard
        </Link>

        {/* Orders Menu */}
        <div 
          className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsOrdersOpen(!isOrdersOpen)}
        >
          <div className="flex items-center">
            <FaBox className="mr-3" /> Orders
          </div>
          {isOrdersOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {/* Orders Submenu */}
        {isOrdersOpen && (
          <div className="ml-6 space-y-1">
            <Link 
              to="/admin/new-order" 
              className="flex items-center p-2 pl-4 rounded hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaPlus className="mr-3" /> New Order
            </Link>
            <Link 
              to="/admin/orders" 
              className="flex items-center p-2 pl-4 rounded hover:text-bule !text-white hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaCog className="mr-3" /> View Orders
            </Link>
          </div>
        )}

        {/* Employees Menu */}
        <div 
          className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsEmployeesOpen(!isEmployeesOpen)}
        >
          <div className="flex items-center">
            <FaUsers className="mr-3" /> Employees
          </div>
          {isEmployeesOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {/* Employees Submenu */}
        {isEmployeesOpen && (
          <div className="ml-6 space-y-1">
            <Link 
              to="/admin/add-employee" 
              className="flex items-center p-2 pl-4 rounded hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaUserPlus className="mr-3" /> Add Employee
            </Link>
            <Link 
              to="/admin/employees" 
              className="flex items-center p-2 pl-4 rounded hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaUser className="mr-3" /> View Employees
            </Link>
          </div>
        )}

        {/* Services Menu */}
        <div 
          className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsServicesOpen(!isServicesOpen)}
        >
          <div className="flex items-center">
            <FaTools className="mr-3" /> Services
          </div>
          {isServicesOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {/* Services Submenu */}
        {isServicesOpen && (
          <div className="ml-6 space-y-1">
            <Link 
              to="/admin/services/add" 
              className="flex items-center p-2 pl-4 rounded hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaPlus className="mr-3" /> Add Service
            </Link>
            <Link 
              to="/admin/services/view" 
              className="flex items-center p-2 pl-4 rounded hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaCog className="mr-3" /> View Services
            </Link>
          </div>
        )}

        {/* Customers Menu */}
        <div 
          className="flex items-center justify-between p-3 rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          onClick={() => setIsCustomersOpen(!isCustomersOpen)}
        >
          <div className="flex items-center">
            <FaUsers className="mr-3" /> Customers
          </div>
          {isCustomersOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {/* Customers Submenu */}
        {isCustomersOpen && (
          <div className="ml-6 space-y-1">
            <Link 
              to="/admin/add_customer" 
              className="flex items-center p-2 pl-4 rounded hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaUserPlus  className="mr-3" /> Add Customer
            </Link>
            <Link 
              to="/admin/customers" 
              className="flex items-center p-2 pl-4 rounded hover:bg-gray-700 transition-colors duration-200 !no-underline"
            >
              <FaUser className="mr-3" /> View Customers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMenu;