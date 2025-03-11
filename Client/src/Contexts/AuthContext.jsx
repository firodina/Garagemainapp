import React, { useState, useEffect, useContext } from "react";
import getAuth from "../util/employeeAuthHeader"; // Ensure this utility function is correctly implemented

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [userType, setUserType] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const loggedInEmployee = await getAuth(); // Adjust based on how `getAuth` works

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
          setCustomerId(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLogged(false);
        setEmployee(null);
        setUserType(null);
        setIsAdmin(false);
        setCustomerId(null);
      }
    };

    checkAuth();
  }, [userType, isLogged]);

  const logout = () => {
    setIsLogged(false);
    setIsAdmin(false);
    setEmployee(null);
    setUserType(null);
    setCustomerId(null);
    localStorage.removeItem("employee"); // Ensure you clear local storage if it's used
  };
  const value = {
    isLogged,
    isAdmin,
    setIsAdmin,
    setIsLogged,
    setEmployee,
    employee,
    logout,
    userType,
    customerId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
