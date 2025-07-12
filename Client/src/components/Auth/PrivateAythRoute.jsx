import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const PrivateAuthRoute = () => {
  const { isLoading, isLogged, isCustomerLogged} = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state during auth check
  }

  if (isLogged || isCustomerLogged) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateAuthRoute;