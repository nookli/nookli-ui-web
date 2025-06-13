import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Or use context
  // return children
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
