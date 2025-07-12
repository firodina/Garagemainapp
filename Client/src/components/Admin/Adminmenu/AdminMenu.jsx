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
  FaCar,
  FaList,
  FaFileInvoiceDollar,
  FaSearch,
  FaEdit,
  FaCalendarAlt,
  FaHome,
} from "react-icons/fa";

const AdminMenu = () => {
  // State to manage the visibility of sub-menus
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  const [isVehiclesOpen, setIsVehiclesOpen] = useState(false);

  // Toggle functions for each sub-menu
  const toggleServicesMenu = () => setIsServicesOpen(!isServicesOpen);
  const toggleOrdersMenu = () => setIsOrdersOpen(!isOrdersOpen);
  const toggleEmployeesMenu = () => setIsEmployeesOpen(!isEmployeesOpen);
  const toggleCustomersMenu = () => setIsCustomersOpen(!isCustomersOpen);
  const toggleVehiclesMenu = () => setIsVehiclesOpen(!isVehiclesOpen);

  return (
    <div className="w-full md:w-64 bg-white-800 text-white p-4 h-screen ">
      <h2 className="text-xl font-bold mb-6 border-b pb-2 text-black">Admin Menu</h2>
      <div className="space-y-1">
        <Link 
          to="/admin" 
          className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
        >
          <FaTachometerAlt className="mr-3" /> Dashboard
        </Link>

        {/* Orders menu */}
        <div 
          className="flex items-center justify-between p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer text-black"
          onClick={toggleOrdersMenu}
        >
          <div className="flex items-center">
            <FaFileInvoiceDollar className="mr-3" /> Orders
          </div>
          <span>{isOrdersOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
        {isOrdersOpen && (
          <div className="ml-4 space-y-1">
            <Link 
              to="/admin/orders/add" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaPlus className="mr-3" /> Create Order
            </Link>
            <Link 
              to="/admin/orders" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaList className="mr-3" /> All Orders
            </Link>
      
          </div>
        )}

        {/* Employees menu */}
        <div 
          className="flex items-center justify-between p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer text-black"
          onClick={toggleEmployeesMenu}
        >
          <div className="flex items-center">
            <FaUsers className="mr-3" /> Employees
          </div>
          <span>{isEmployeesOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
        {isEmployeesOpen && (
          <div className="ml-4 space-y-1">
            <Link 
              to="/admin/add-employee" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaUserPlus className="mr-3" /> Add Employee
            </Link>
            <Link 
              to="/admin/employees" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaList className="mr-3" /> View Employees
            </Link>
          </div>
        )}

        {/* Services menu */}
        <div 
          className="flex items-center justify-between p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer !text-black"
          onClick={toggleServicesMenu}
        >
          <div className="flex items-center">
            <FaTools className="mr-3" /> Services
          </div>
          <span>{isServicesOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
        {isServicesOpen && (
          <div className="ml-4 space-y-1">
            <Link 
              to="/admin/services/add" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaPlus className="mr-3" /> Add Service
            </Link>
            <Link 
              to="/admin/services/view" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaList className="mr-3" /> View Services
            </Link>
            <Link 
              to="/admin/service-types" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaCog className="mr-3" /> Service Types
            </Link>
          </div>
        )}

        {/* Customers menu */}
        <div 
          className="flex items-center justify-between p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer !text-black"
          onClick={toggleCustomersMenu}
        >
          <div className="flex items-center">
            <FaUsers className="mr-3" /> Customers
          </div>
          <span>{isCustomersOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
        {isCustomersOpen && (
          <div className="ml-4 space-y-1">
            <Link 
              to="/admin/add_customer" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaUserPlus className="mr-3" /> Add Customer
            </Link>
            <Link 
              to="/admin/customers" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaList className="mr-3" /> View Customers
            </Link>
          </div>
        )}

        {/* Vehicles menu */}
        <div 
          className="flex items-center justify-between p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer !text-black"
          onClick={toggleVehiclesMenu}
        >
          <div className="flex items-center">
            <FaCar className="mr-3" /> Vehicles
          </div>
          <span>{isVehiclesOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
        </div>
        {isVehiclesOpen && (
          <div className="ml-4 space-y-1">
            <Link 
              to="/admin/vehicles/add-type" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaPlus className="mr-3" /> Add Vehicle Type
            </Link>
            <Link 
              to="/admin/vehicles/add" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaPlus className="mr-3" /> Add Vehicle
            </Link>
            <Link 
              to="/admin/vehicles" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaList className="mr-3" /> View Vehicles
            </Link>
            <Link 
              to="/admin/vehicle-types" 
              className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
            >
              <FaList className="mr-3" /> View Vehicle Types
            </Link>
          </div>
        )}

        {/* Settings menu */}
        <Link 
          to="/admin/settings" 
          className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
        >
          <FaCog className="mr-3" /> Settings
        </Link>
        <Link 
          to="/admin/appointments" 
          className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
        >
          <FaCalendarAlt className="mr-3" /> Appointments
        </Link>
        <Link 
          to="/admin/house-to-house" 
          className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors !no-underline !text-black"
        >
          <FaHome className="mr-3" /> House to House List 
        </Link>
      </div>
    </div>
  );
};

export default AdminMenu;