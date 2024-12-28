import Header from "./components/Header/Header";
import HomePage from "./Pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Assets/css/font-icons.css";
import "./Assets/sass/style.scss";
import "./Assets/sass/elements/_button.scss";
import { Routes, Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
import ScheduleAppointment from "./components/ScheduleAppointment/ScheduleAppointment";
import RegistrationForm from "./components/Register/Register";
import ContactUs from "./components/ContactUs/ContactUs";
import AdminDashbord from "./Pages/admin/AdminDashBoard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/admin-dashboard" />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashbord/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
