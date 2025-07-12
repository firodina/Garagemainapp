import React, { useState, useEffect, useContext } from "react";
import getAuth from "../Utils/employeeAuthHeader "; // Utility for employee auth
import customerAuthHeader from "../Utils/customer"; // Utility for customer auth

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isCustomerLogged, setIsCustomerLogged] = useState(false); // New state for customer
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [customer, setCustomer] = useState(null); // New state for customer
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check employee authentication
        const loggedInEmployee = await getAuth();
        if (loggedInEmployee && loggedInEmployee.employee_token) {
          setIsLogged(true);
          setEmployee(loggedInEmployee);
          setUserType(loggedInEmployee.employee_role);
          setIsAdmin(loggedInEmployee.employee_role === 3);
        } else {
          setIsLogged(false);
          setEmployee(null);
          setUserType(null);
          setIsAdmin(false);
        }

        // Check customer authentication
        const loggedInCustomer = await customerAuthHeader();
        if (loggedInCustomer && loggedInCustomer.customer_token) {
          setIsCustomerLogged(true);
          setCustomer(loggedInCustomer);
          setUserType(loggedInCustomer.customer_role);
          // If a customer is logged in, ensure employee state is false
          if (isLogged) {
            setIsLogged(false);
          }
        } else {
          setIsCustomerLogged(false);
          setCustomer(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLogged(false);
        setIsCustomerLogged(false);
        setEmployee(null);
        setCustomer(null);
        setUserType(null);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, [userType, isLogged]);

  const logout = () => {
    setIsLogged(false);
    setIsCustomerLogged(false); // Reset customer logged state
    setIsAdmin(false);
    setEmployee(null);
    setCustomer(null); // Clear customer data
    setUserType(null);
    localStorage.removeItem("employee"); // Clear employee data
    localStorage.removeItem("customer"); // Clear customer data
  };

  const value = {
    isLogged,
    isCustomerLogged, // Include customer logged state
    isAdmin,
    setIsAdmin,
    setIsLogged,
    setIsCustomerLogged, // Setter for customer logged state
    setEmployee,
    setCustomer, // Setter for customer data
    setUserType,
    employee,
    logout,
    userType,
    customer, // Include customer data
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};