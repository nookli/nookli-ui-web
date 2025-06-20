import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Dashboard sub-pages
import DashboardHome from './pages/dashboard/Home';
import Workspaces from './pages/dashboard/Workspaces.jsx';
import Stacks from './pages/dashboard/Stacks';
import Flows from './pages/dashboard/Flows';
import Search from './pages/dashboard/Search';
import LoginWithProvider from './pages/Login'
import RegisterWithProvider from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    if (window.location.pathname === '/') {
      localStorage.getItem('sb-pbpfolqijszsnvtydalm-auth-token')
        ? (window.location.pathname = '/dashboard/home')
        : (window.location.pathname = '/login');
    }
  }
  , []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginWithProvider />} />
        <Route path="/register" element={<RegisterWithProvider />} />

        {/* Dashboard routes (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<DashboardHome />} />
          <Route path="workspaces" element={<Workspaces />} />
          <Route path="stacks" element={<Stacks />} />
          <Route path="flows" element={<Flows />} />
          <Route path="search" element={<Search />} />
          {/* default is home always */}
          <Route index element={<DashboardHome />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
