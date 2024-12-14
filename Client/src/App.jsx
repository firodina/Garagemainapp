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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/schedule" element={<ScheduleAppointment />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
