import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import customerLogIn from "../../Service/Login.server.customer";
import { useAuth } from "../../Contexts/AuthContext";

function CustomerLogin() {
    const navigate = useNavigate();
    const { setIsCustomerLogged, setCustomer } = useAuth(); // Corrected destructuring
    const [customer_email, setEmail] = useState("");
    const [customer_password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        let valid = true;

        // Trim input values
        const trimmedEmail = customer_email.trim();
        const trimmedPassword = customer_password.trim();

        // Email validation
        if (!trimmedEmail) {
            setEmailError("Please enter your email address");
            valid = false;
        } else {
            const regex = /^\S+@\S+\.\S+$/;
            if (!regex.test(trimmedEmail)) {
                setEmailError("Invalid email format");
                valid = false;
            } else {
                setEmailError("");
            }
        }

        // Password validation
        if (!trimmedPassword || trimmedPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!valid) return;

        const formData = { email: trimmedEmail, password: trimmedPassword };
        console.log("Submitting login form with data:", formData);

        try {
            const response = await customerLogIn(formData);
            const data = await response.json();

            if (response.ok) {
                // Store customer info and update context
                localStorage.setItem("customer", JSON.stringify(data.data));
                setIsCustomerLogged(true); // Corrected: using the setter function
                setCustomer(data.data);

                // Redirect to the customer dashboard
                navigate("/customer");
            } else {
                const errorMessages = {
                    "Incorrect password": "Incorrect password",
                    "Customer does not exist": "Customer does not exist",
                };

                setServerError(data.message || "An unexpected error occurred.");

                if (errorMessages[data.message]) {
                    setPasswordError(errorMessages[data.message]);
                    setEmailError(data.message === "Customer does not exist" ? errorMessages[data.message] : "");
                }
            }
        } catch (err) {
            console.error("Error during login:", err);
            setServerError("An error has occurred. Please try again later.");
        }
    };

    return (
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
                                value={customer_email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full p-3 border rounded ${emailError ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>
                        {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
                        <div className="mb-4">
                            <input
                                type="password"
                                placeholder="Password"
                                value={customer_password}
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
    );
}

export default CustomerLogin;