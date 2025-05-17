import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Primary Sidebar */}
      <Sidebar isRightSidebarOpen={isRightSidebarOpen} setIsRightSidebarOpen={setIsRightSidebarOpen} />

      {/* Main Area (Topbar + Content + Right Sidebar) */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        <div className="flex h-full">
          {/* Main Content Area */}
          <div
            className={`relative transition-all duration-300 bg-gray-200 ${isRightSidebarOpen ? 'w-[270px]' : 'w-0'
              } overflow-hidden`}
          >


            {/* Content inside Sidebar */}
            <div className="p-4">
              <p className="font-semibold">Sidebar</p>
              <p className="text-sm text-gray-700 mt-2">Add your widgets/info here.</p>
            </div>
          </div>
          <div className={`transition-all duration-300 ${isRightSidebarOpen ? 'w-[calc(100%-270px)]' : 'w-full'} p-6 bg-white overflow-y-auto`}>
            <Outlet />
          </div>

          {/* Right Sidebar */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
