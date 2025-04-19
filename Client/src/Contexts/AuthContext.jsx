import React, { useState, useEffect, useContext } from "react";
import getAuth from "../Utils/employeeAuthHeader "; // Utility for employee auth
import customerAuthHeader from "../Utils/customer"; // Utility for customer auth

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [userType, setUserType] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isCustomerLogged, setIsCustomerLogged] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedInEmployee = await getAuth(); // Check employee authentication

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

        const loggedInCustomer = await customerAuthHeader();

        if (loggedInCustomer && loggedInCustomer.customer_token) {
          setIsLogged(true); // ✅ Important: Treat customer as logged in
          setIsCustomerLogged(true);
          setCustomer(loggedInCustomer);
          setUserType(loggedInCustomer.customer_role);
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
  }, []);

  const logout = () => {
    setIsLogged(false);
    setIsAdmin(false);
    setEmployee(null);
    setUserType(null);
    setIsCustomerLogged(false);
    setCustomer(null);
    localStorage.removeItem("employee"); // Clear employee
    localStorage.removeItem("customer"); // Clear customer
  };

  const value = {
    isLogged,
    isAdmin,
    setIsAdmin,
    setIsLogged,
    setEmployee,
    employee,
    isCustomerLogged,
    setIsCustomerLogged,
    setCustomer,
    customer,
    logout,
    userType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};