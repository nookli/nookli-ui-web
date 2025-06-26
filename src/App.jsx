// import { useEffect } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import NotFound from './pages/NotFound';
// import ProtectedRoute from './routes/ProtectedRoute';
// import DashboardLayout from './layouts/DashboardLayout';

// // Dashboard sub-pages
// import DashboardHome from './pages/dashboard/Home';
// import Workspaces from './pages/dashboard/Workspaces.jsx';
// import Stacks from './pages/dashboard/Stacks';
// import Flows from './pages/dashboard/Flows';
// import Search from './pages/dashboard/Search';
// import LoginWithProvider from './pages/Login'
// import RegisterWithProvider from './pages/Register';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import SpaceDetail from './pages/dashboard/SpaceDetail';
// import StackDetail from './pages/dashboard/StackDetail';

// const App = () => {

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginWithProvider />} />
//         <Route path="/register" element={<RegisterWithProvider />} />

//         {/* Dashboard routes (protected) */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="home" element={<DashboardHome />} />
//           <Route path="workspaces" element={<Workspaces />} />
//           <Route path="spaces/:spaceId" element={<SpaceDetail />} />
//           <Route path="spaces/:spaceId/stacks/:{id}" element={<StackDetail />} />
//           <Route path="stacks" element={<Stacks />} />
//           <Route path="spaces" element={<Flows />} />
//           <Route path="search" element={<Search />} />
//           {/* default is home always */}
//           <Route index element={<DashboardHome />} />
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };

// export default App;



import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

// Public pages
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import LoginWithProvider from './pages/Login';
import RegisterWithProvider from './pages/Register';

// Route protection and layout
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Dashboard sub-pages
import DashboardHome from './pages/dashboard/Home';
import Workspaces from './pages/dashboard/Workspaces';
import Stacks from './pages/dashboard/Stacks';
import Flows from './pages/dashboard/Flows';
import Search from './pages/dashboard/Search';

// Space detail layout and tab components
import SpaceDetail from './pages/dashboard/SpaceDetail';
import FlowsTab from './pages/dashboard/SpaceDetail/FlowsTab';
import TrashTab from './pages/dashboard/SpaceDetail/TrashTab';
import LinkedSpacesTab from './pages/dashboard/SpaceDetail/LinkedSpacesTab';
import SettingsTab from './pages/dashboard/SpaceDetail/SettingsTab';
import StacksTab from './pages/dashboard/SpaceDetail/StacksTab';
import OverviewTab from './pages/dashboard/SpaceDetail/OverviewTab';
import StackDetailTab from './pages/dashboard/StackDetailTab';

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginWithProvider />} />
        <Route path="/register" element={<RegisterWithProvider />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="workspaces" element={<Workspaces />} />
          <Route path="stacks" element={<Stacks />} />
          <Route path="spaces" element={<Flows />} />
          <Route path="search" element={<Search />} />

          {/* Space detail with nested tab routes */}
          <Route path="spaces/:spaceId" element={<SpaceDetail />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewTab />} />
            <Route path="flows" element={<FlowsTab />} />
            <Route path="stacks" element={<StacksTab />} />
            <Route path="stacks/:stackId" element={<StackDetailTab />} />
            <Route path="settings" element={<SettingsTab />} />
            <Route path="trash" element={<TrashTab />} />
            <Route path="linked-spaces" element={<LinkedSpacesTab />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
