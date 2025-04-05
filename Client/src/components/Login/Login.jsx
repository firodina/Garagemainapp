import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../Service/login.service";
import { useAuth } from "../../Contexts/AuthContext";
import img9 from "../../assets/img/banner/10006.jpg";

function Login() {
  const navigate = useNavigate();
  const { setIsLogged, setEmployee, setIsAdmin } = useAuth();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!employee_email) {
      setEmailError("Please enter your email address");
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    const formData = { employee_email, employee_password };

    try {
      const response = await loginService.logIn(formData);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("employee", JSON.stringify(data.data));
        setIsLogged(true);
        setEmployee(data.data);
        setIsAdmin(data.data.employee_role === 3);
        navigate("/");
      } else {
        if (data.message === "Incorrect password") {
          setPasswordError("Incorrect password");
        } else if (data.message === "Employee does not exist") {
          setEmailError("Employee does not exist");
        } else {
          setServerError(data.message);
        }
      }
    } catch (err) {
      setServerError("An error has occurred. Please try again later.");
    }
  };

  return (
    <>
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white"
        style={{
          backgroundImage: `url(${img9})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          backgroundAttachment: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "400px",
          zIndex: "-1",
          marginBottom: 0, // Ensures no margin below the banner
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-wrap justify-between items-center">
            <div className="section-title-area ltn__section-title-2">
              <h6 className="section-subtitle text-gray-700 uppercase !text-lg mb-6">
                // Welcome to our company
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 mt-0 relative z-10">
        <div className="flex w-full max-w-4xl overflow-hidden gap-8">
          <div className="w-full p-10 flex flex-col justify-center gap-16 mt-0">
            <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
            {serverError && <p className="text-red-500 text-sm mb-2">{serverError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={employee_email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-3 border rounded ${emailError ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={employee_password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 border rounded ${passwordError ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
