import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Dashboard sub-pages
import DashboardHome from './pages/dashboard/Home';
// import New from './pages/dashboard/New';
import Workspaces from './pages/dashboard/Workspaces.jsx';
import Stacks from './pages/dashboard/Stacks';
// import Flows from './pages/dashboard/Flows';
// import Search from './pages/dashboard/Search';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

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
        {/* <Route path="new" element={<New />} />
        <Route path="flows" element={<Flows />} />
        <Route path="search" element={<Search />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
