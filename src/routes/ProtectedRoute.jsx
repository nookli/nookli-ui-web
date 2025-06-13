import { Navigate } from "react-router-dom";
import { useUserStore } from "../redux/useUserStore";

const ProtectedRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = !!user;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;