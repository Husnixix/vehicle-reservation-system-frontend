import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const authContext = useContext(AuthContext);
  console.log(
    "ProtectedRoute - loading:",
    authContext?.loading,
    "user:",
    authContext?.user
  );

  if (authContext?.loading) {
    return <div>Loading...</div>;
  }

  if (!authContext || !authContext.user) {
    console.log("Redirecting to / because user is null");
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(authContext.user.userRole)) {
    console.log("Redirecting to / because role not allowed");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;