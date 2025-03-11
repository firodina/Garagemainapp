import Header from "./components/Header/Header";
import HomePage from "./Pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Assets/css/font-icons.css";
import "./Assets/sass/style.scss";
import "./Assets/sass/elements/_button.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import ScheduleAppointment from "./components/ScheduleAppointment/ScheduleAppointment";
import RegistrationForm from "./components/Register/Register";
import ContactUs from "./components/ContactUs/ContactUs";
import AdminDashbord from "./Pages/admin/AdminDashBoard";
import AddEmployee from "./Pages/admin/AddEmployee";
import MyHistory from "./Pages/Customer/MyHistory/MyHistory";
import MyOrderList from "./Pages/Customer/MyOrderList/MyOrderList";
import MyProfileList from "./Pages/Customer/MyProfileList/MyProfileList";
import CustomerDash from "./Pages/Customer/CustomerDash";
// import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import EmployeeTasks from "./Pages/Employee/EmployeeTask";
import EmployeeDash from "./Pages/Employee/EmployeeDashboard";
import EmployeePofile from "./Pages/Employee/EmployeeProfile/EmployeeProfile";
import EmployeSetting from "./Pages/Employee/EmployeeSetting/EmployeSetting";
import TaskHistory from "./Pages/Employee/TaskHistory/TaskHistory";
import AddService from "./Pages/admin/AddService";
// import AddCustomerForm from "./Components/Admin/AddCustomer/AddCustomerForm";
import Addcustomer from "./Pages/admin/AddCustomer";
import AboutUs from "./Pages/AboutUs";
import Customers from "./Pages/admin/Custmoers";
import Employees from "./Pages/admin/Employees";
import ViewServices from "./Pages/admin/ViewService";
import Orders from "./Pages/admin/ViewOrder";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/admin-dashboard" />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs/>} />


        <Route path="/admin" element={<AdminDashbord />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
        <Route path="/admin/services/add" element={<AddService />} />
        {/* <Route path="/admin/add-customer" element={<AddCustomerForm />} /> */}
        <Route path="/admin/add_customer" element={<Addcustomer/>} />
        <Route path="/admin/customers" element={<Customers/>} />
        <Route path="/admin/employees" element={<Employees/>} />
        <Route path="/admin/services/view" element={<ViewServices />} />
        <Route path="/admin/orders" element={<Orders/>} />






        <Route path="/employee" element={<EmployeeDash />} />
        <Route path="/employee/tasks" element={<EmployeeTasks />} />
        <Route path="/employee/profile" element={<EmployeePofile />} />
        <Route path="/employee/settings" element={<EmployeSetting />} />
        <Route path="/employee/task-history" element={<TaskHistory />} />

        <Route path="/Customer" element={<CustomerDash />} />
        <Route path="/Customer/Orders" element={<MyOrderList />} />
        <Route path="/Customer/history" element={<MyHistory />} />
        <Route path="/customer/profile" element={<MyProfileList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
