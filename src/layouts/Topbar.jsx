import React, { useState } from 'react';
import { FaBell, FaRedo, FaSearch, FaHistory, FaChevronDown } from 'react-icons/fa';
import Popover from '@mui/material/Popover';
import AIChatPanel from './AIChatPanel';

const Topbar = () => {
  // State for all popovers
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [historyAnchorEl, setHistoryAnchorEl] = useState(null);
  const [askAtomAnchorEl, setAskAtomAnchorEl] = useState(null);

    const [isChatOpen, setIsChatOpen] = useState(false);


  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const handleHistoryClick = (event) => {
    setHistoryAnchorEl(event.currentTarget);
  };

  const handleAskAtomClick = (event) => {
    setAskAtomAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSearchAnchorEl(null);
    setHistoryAnchorEl(null);
    setAskAtomAnchorEl(null);
  };

  const searchOpen = Boolean(searchAnchorEl);
  const historyOpen = Boolean(historyAnchorEl);
  const askAtomOpen = Boolean(askAtomAnchorEl);

  return (
    <div className="flex items-center justify-between bg-[#2c3e50] text-white px-6 py-3">
      <div className="flex-1"></div>

      <div className="flex items-center gap-4">
        {/* Search Box with icon */}
        <div className="relative flex items-center">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Find files, docs, or workspaces"
            onClick={handleSearchClick}
            className="w-[450px] max-w-full pl-10 pr-4 py-2 rounded bg-white text-black focus:outline-none transition-all duration-200
                     focus:w-[500px] md:w-[350px] lg:w-[450px]"
          />
        </div>

        {/* History Icon */}
        <button
          onClick={handleHistoryClick}
          className="p-2 text-white hover:text-gray-300 transition-colors"
        >
          <FaHistory className="text-lg" />
        </button>

        {/* Notification Bell */}
        <button className="p-2 text-white hover:text-gray-300 transition-colors">
          <FaBell className="text-lg" />
        </button>

        {/* Ask Atom Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center gap-2 bg-[#F53E47] hover:bg-[#e2333b] text-white px-4 py-2 rounded font-semibold transition-colors"
        >
          Ask Atom
          <FaChevronDown className="text-xs" />
        </button>
      </div>

      <AIChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />


      {/* Search Popover */}
      <Popover
        open={searchOpen}
        anchorEl={searchAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            width: '450px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            marginTop: '8px'
          }
        }}
      >
        <div className="p-2">
          <h3 className="font-medium mb-2">Recent Searches</h3>
          <div className="space-y-2">
            {/* <p className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">Project documentation</p>
            <p className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">User onboarding</p>
            <p className="text-sm p-2 hover:bg-gray-100 rounded cursor-pointer">API integration</p> */}
          </div>
        </div>
      </Popover>

      {/* History Popover */}
      <Popover
        open={historyOpen}
        anchorEl={historyAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="w-64 p-4">
          <h3 className="font-medium mb-3">Recent Activity</h3>
          {/* <div className="space-y-3">
            <div className="text-sm">
              <p>Viewed "Project Plan"</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
            <div className="text-sm">
              <p>Edited "User Flow"</p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </div> */}
        </div>
      </Popover>

      {/* Ask Atom Popover */}
      <Popover
        open={askAtomOpen}
        anchorEl={askAtomAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="w-48 p-2">
          {/* <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">New Query</button>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">Saved Queries</button>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded text-sm">Query History</button> */}
        </div>
      </Popover>
    </div>
  );
};

export default Topbar;