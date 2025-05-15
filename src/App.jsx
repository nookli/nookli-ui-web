import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
        {/* <Route path="new" element={<New />} />*/}
        {/* <Route path="search" element={<Search />} />  */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
