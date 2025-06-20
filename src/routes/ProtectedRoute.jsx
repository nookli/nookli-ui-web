import { Navigate } from "react-router-dom";
import { useCurrentUserStore } from "../redux/useCurrentUserStore";

const ProtectedRoute = ({ children }) => {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  console.log("ProtectedRoute currentUser:", currentUser);
  const isAuthenticated = !!currentUser;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
