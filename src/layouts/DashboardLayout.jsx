import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import SearchPopup from './SearchPopup';
import Dialog from '@mui/material/Dialog';
import { IoClose } from 'react-icons/io5';
import SubSidebar from './SubSidebar';

const DashboardLayout = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [searchPopup, setsearchPopup] = useState(false);

  const handleSearchClose = () => setsearchPopup(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Primary Sidebar (left) */}
      <Sidebar
        isRightSidebarOpen={isRightSidebarOpen}
        setIsRightSidebarOpen={setIsRightSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Topbar */}
        <Topbar setsearchPopup={setsearchPopup} />

        <div className="flex flex-1 overflow-hidden">
          {/* SubSidebar (right sidebar) */}
          <SubSidebar isOpen={isRightSidebarOpen} />

          {/* Main Outlet View */}
          <div
            className={`transition-all duration-300 overflow-y-auto p-6 bg-white w-full ${
              isRightSidebarOpen ? 'w-[calc(100%-270px)]' : 'w-full'
            }`}
          >
            <Outlet />
          </div>
        </div>
      </div>

      {/* Search Dialog */}
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
          },
        }}
      >
        <button
          onClick={handleSearchClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black"
        >
          <IoClose size={20} />
        </button>
        <SearchPopup />
      </Dialog>
    </div>
  );
};

export default DashboardLayout;
