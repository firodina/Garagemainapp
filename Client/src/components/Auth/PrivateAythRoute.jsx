import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const PrivateAuthRoute = () => {
  const { isLogged, isCustomerLogged } = useAuth();

  // Allow access if either an employee or a customer is logged in
  return isLogged || isCustomerLogged ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateAuthRoute;