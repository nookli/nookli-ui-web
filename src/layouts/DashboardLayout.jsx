import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import SearchPopup from './SearchPopup';
import Dialog from '@mui/material/Dialog';
import { IoClose } from 'react-icons/io5';

const DashboardLayout = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [searchPopup, setsearchPopup] = useState(false);
  const handleSearchClose = () => {
    setsearchPopup(false);
  };

  return (
    <div className="flex h-screen">
      {/* Primary Sidebar */}
      <Sidebar isRightSidebarOpen={isRightSidebarOpen} setIsRightSidebarOpen={setIsRightSidebarOpen} />

      {/* Main Area (Topbar + Content + Right Sidebar) */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar setsearchPopup={setsearchPopup} />

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
      <Dialog
        open={searchPopup}
        onClose={handleSearchClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            minHeight: 450,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            px: 3,
            py: 2,
            position: 'relative',
          }
        }}
      >

        <button onClick={() => setsearchPopup(false)} className="absolute top-2 right-3 text-gray-600 hover:text-black">
          <IoClose size={20} />
        </button>
        <SearchPopup />
      </Dialog>
    </div>
  );
};

export default DashboardLayout;
