import { Navigate } from 'react-router-dom';
import { useUserStore } from '../redux/useUserStore';

const ProtectedRoute = ({ children }) => {
    const user = useUserStore((state) => state.user);
    const isAuthenticated = !!user;
  // const isAuthenticated = localStorage.getItem('sb-pbpfolqijszsnvtydalm-auth-token'); // Or use context
  // return children
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
