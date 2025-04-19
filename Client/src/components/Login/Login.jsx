import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../../Service/login.service";
import { useAuth } from "../../Contexts/AuthContext";
// import img9 from "../../assets/img/banner/10006.jpg";

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

    // Frontend validation
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
        // Login success
        localStorage.setItem("employee", JSON.stringify(data.data));
        setIsLogged(true);
        setEmployee(data.data);
        setIsAdmin(data.data.employee_role === 3);
        // Redirect based on role
        switch (data.data.employee_role) {
          case 3: // Admin
              navigate("/admin");
              break;
          case 2: // Manager
              navigate("/manager");
              break;
          case 1: // Employee
              navigate("/employee");
              break;
          default:
              navigate("/"); // Fallback to home if role not recognized
              break;
      }
      } else {
        // Handle errors properly
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
