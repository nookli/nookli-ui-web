import React, { useState } from 'react';
import { FaBell, FaRedo, FaSearch, FaHistory, FaChevronDown, FaRobot } from 'react-icons/fa';
import { GiMoebiusStar } from "react-icons/gi";
import Popover from '@mui/material/Popover';
import AIChatPanel from './AIChatPanel';
import SearchPopup from './SearchPopup';
import Dialog from '@mui/material/Dialog';
import { IoClose } from 'react-icons/io5';
import HistoryPopover from './HistoryPopover';
import NotificationsPopover from './NotificationsPopover';

const Topbar = ({ setsearchPopup }) => {
  // State for all popovers
  const [historyAnchorEl, setHistoryAnchorEl] = useState(null);
  const [bellAnchorEl, setBellAnchorEl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSearchClick = (event) => {
    setsearchPopup(true);
  };

  const handleHistoryClick = (event) => {
    setHistoryAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setHistoryAnchorEl(null);
    setBellAnchorEl(null);
  };

  const historyOpen = Boolean(historyAnchorEl);

  const handleBellClick = (event) => {
    setBellAnchorEl(event.currentTarget);
  };

  const BellOpen = Boolean(bellAnchorEl);

  return (
    <div className="flex items-center justify-between bg-[#2c3e50] text-white px-6 py-3">
      <div className="flex-1"></div>

      <div className="flex items-center gap-4">
        <div onClick={handleSearchClick}
          className="w-[450px] max-w-full pl-10 pr-4 py-2 rounded bg-white text-gray-700 cursor-pointer relative flex items-center
        hover:shadow focus-within:shadow transition-all duration-200 md:w-[350px] lg:w-[450px]"
        >
          <FaSearch className="absolute left-3 text-gray-400" />
          <span className="text-sm">Find files, docs, or workspaces</span>


        </div>

        {/* <div className="relative flex items-center">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Find files, docs, or workspaces"
            onClick={handleSearchClick}
            className="w-[450px] max-w-full pl-10 pr-4 py-2 rounded bg-white text-black focus:outline-none transition-all duration-200
                     focus:w-[500px] md:w-[350px] lg:w-[450px]"
          />
        </div> */}

        {/* History Icon */}
        <button
          onClick={handleHistoryClick}
          className="p-2 text-white hover:text-gray-300 transition-colors"
        >
          <FaHistory className="text-lg" />
        </button>

        {/* Notification Bell */}
        <button onClick={handleBellClick}
          className="p-2 text-white hover:text-gray-300 transition-colors">
          <FaBell className="text-lg" />
        </button>

        {/* Ask Atom Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-2 text-white hover:text-gray-300 transition-colors">

          <GiMoebiusStar className="text-lg text-[#F53E47]" />
        </button>
      </div>

      {/* Ask Atom Popover */}
      <AIChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* History Popover */}
      <Popover
        open={historyOpen}
        anchorEl={historyAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <HistoryPopover />
      </Popover>

      {/* Notifications Popover */}
      <Popover
        open={BellOpen}
        anchorEl={bellAnchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <NotificationsPopover />
      </Popover>
    </div >
  );
};

export default Topbar;