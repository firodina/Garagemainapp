import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

import Header from "./components/Header/Header";
import HomePage from "./Pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Assets/css/font-icons.css";
// import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import RegistrationForm from "./components/Register/Register";
import AdminDashbord from "./Pages/admin/AdminDashBoard";
import AddEmployee from "./Pages/admin/AddEmployee";
import MyHistory from "./Pages/Customer/MyHistory/MyHistory";
import MyOrderList from "./Pages/Customer/MyOrderList/MyOrderList";
import MyProfileList from "./Pages/Customer/MyProfileList/MyProfileList";
import CustomerDash from "./Pages/Customer/CustomerDash";
import EmployeeTasks from "./Pages/Employee/EmployeeTask";
import EmployeeDash from "./Pages/Employee/EmployeeDashboard";
import EmployeePofile from "./Pages/Employee/EmployeeProfile/EmployeeProfile";
import EmployeSetting from "./Pages/Employee/EmployeeSetting/EmployeSetting";
import TaskHistory from "./Pages/Employee/TaskHistory/TaskHistory";
import AddService from "./Pages/admin/AddService";
import Addcustomer from "./Pages/admin/AddCustomer";
import AboutUs from "./Pages/AboutUs";
import Customers from "./Pages/admin/Custmoers";
import Employees from "./Pages/admin/Employees";
import ViewServices from "./Pages/admin/ViewService";
import Orders from "./Pages/admin/ViewOrder";
import PrivateAuthRoute from "./components/Auth/PrivateAythRoute";
import Strategys from "./Pages/Strategys";
import Schedule from "./Pages/Schedule";
import ServicePage from "./Pages/ServicePage/ServicePage";
import ContactUsPage from "./Pages/ContactUsPage/ContactUsPage";
import Maintenance from "./Pages/Maintenance/Maintenance";
import HtoH from "./Pages/HouseToHouse/HtoH";
import AddVehicle from "./Pages/admin/Vehicle/AddVehicle";
import Customer from "./Pages/admin/Custmoers";
import AddServices from "./Pages/admin/AddService";
import AddCustomer from "./Pages/admin/AddCustomer";
import AddVehicleType from "./Pages/admin/Vehicle/AddVehicleType";
import VehicleList from "./Pages/admin/Vehicle/VehicleList";
import VehicleTypeList from "./Pages/admin/Vehicle/VehicleTypeList";
import EditVehicle from "./Pages/admin/Vehicle/EditVehicle";
import VehicleDetailPage from "./Pages/admin/Vehicle/VehicleDetail";
import EditService from "./Pages/admin/EditService";
import ServiceDetailsPage from "./Pages/admin/ServiceDetailsPage";
import AddOrder from "./Pages/admin/Order/AddOrder";
import OrderListTable from "./Pages/admin/Order/OrderList";
import OrderDetailCard from "./Pages/admin/Order/OrderDetailCard";
import LoginAll from "./Pages/LoginAll";

function App() {
  const { userType, isCustomerLogged } = useAuth();


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/our-strategy" element={<Strategys />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/HtoH" element={<HtoH />} />

          {/* Auth routes */}
          {userType === null ? (
            <>
              <Route path="/login" element={<LoginAll />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegistrationForm />} />
            </>
          ) : (
            <Route element={<PrivateAuthRoute />}>
              {isCustomerLogged ? (
                // Customer Routes
                <>
                  <Route path="/" element={<Navigate to="/customer" />} />
                  <Route path="/customer" element={<CustomerDash />} />
                  <Route path="/customer/orders" element={<MyOrderList />} />
                  <Route path="/customer/history" element={<MyHistory />} />
                  <Route path="/customer/profile" element={<MyProfileList />} />
                </>
              ) : userType === 3 ? (
                // Admin Routes (userType 3)
                <>
                  <Route path="/" element={<Navigate to="/admin" />} />
                  <Route path="/admin" element={<AdminDashbord />} />
                  <Route path="/admin/add-employee" element={<AddEmployee />} />
                  <Route path="/admin/services/add" element={<AddServices />} />
                  <Route path="/admin/add_customer" element={<AddCustomer />} />
                  <Route path="/admin/customers" element={<Customer />} />
                  <Route path="/admin/employees" element={<Employees />} />
                  <Route path="/admin/services/view" element={<ViewServices />} />
                  <Route path="/admin/services/edit/:service_id" element={<EditService />} />
                  <Route path="/admin/services/:service_id" element={<ServiceDetailsPage />} />
                  <Route path="/admin/vehicles/add" element={<AddVehicle />} />
                  <Route path="/admin/vehicles/add-type" element={<AddVehicleType />} />
                  <Route path="/admin/vehicles" element={<VehicleList />} />
                  <Route path="/admin/vehicle-types" element={<VehicleTypeList />} />
                  <Route path="/vehicles/edit/:id" element={<EditVehicle />} />
                  <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
                  <Route path="/admin/orders/add" element={<AddOrder />} />
                  <Route path="/admin/orders" element={<OrderListTable />} />
                  <Route path="/admin/orders/:id" element={<OrderDetailCard />} />
                </>
              ) : userType === 1 ? (
                // Employee Routes (userType 1)
                <>
                  <Route path="/" element={<Navigate to="/employee" />} />
                  <Route path="/employee" element={<EmployeeDash />} />
                  <Route path="/employee/tasks" element={<EmployeeTasks />} />
                  <Route path="/employee/profile" element={<EmployeePofile />} />
                  <Route path="/employee/settings" element={<EmployeSetting />} />
                  <Route path="/employee/task-history" element={<TaskHistory />} />
                </>
              ) : null}
            </Route>
          )}
        </Routes>

      </main>
      <Footer />
    </div>
  );
}

export default App;