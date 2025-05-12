// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';

// const DashboardLayout = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <Topbar />
//         <main className="flex-1 overflow-auto p-4">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaSearch, FaCogs, FaBell, FaRedo, FaRocket, FaNetworkWired, FaBriefcase } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar'

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
     <Sidebar />

      {/* Main layout */}
      <main className="flex-1 flex flex-col">
        <Topbar/>

        <div className="p-6 bg-white h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
