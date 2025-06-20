import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Add,
  Home,
  Workspaces,
  Storage,
  Hub,
  Search,
  Settings,
} from '@mui/icons-material';
import { Avatar } from '@mui/material';
import {
  FaBox,
  FaCube,
  FaLayerGroup,
  FaHome,
  FaAlignJustify,
} from 'react-icons/fa';
import { BsDiagram3 } from 'react-icons/bs';
import SettingsPopup from './SettingsPopup';
import NewPopover from './NewPopover';
import SwitchAccountPopover from './SwitchAccountPopover';
import { useCurrentUserStore } from '../redux/useCurrentUserStore';
import { useUserAccountsStore } from '../redux/useUserAccountsStore';

const navItems = [
  { to: '/dashboard/home', label: 'Home', icon: <Home fontSize="small" /> },
  {
    to: '/dashboard/workspaces',
    label: 'Spaces',
    icon: <Workspaces fontSize="small" />,
  },
  {
    to: '/dashboard/stacks',
    label: 'Stacks',
    icon: <Storage fontSize="small" />,
  },
  { to: '/dashboard/flows', label: 'Flows', icon: <Hub fontSize="small" /> },
  {
    to: '/dashboard/search',
    label: 'Search',
    icon: <Search fontSize="small" />,
  },
];

const Sidebar = ({ isRightSidebarOpen, setIsRightSidebarOpen }) => {
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [newAnchorEl, setNewAnchorEl] = useState(null);

  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const allUsersSessions = useUserAccountsStore((state) => state.users);
  useEffect(() => {
    if (currentUser) {
      return;
    } else navigate('/login');
  }, [currentUser]);

  const avatar = currentUser?.avatar || 'https://i.pravatar.cc/49';

  const handleNewClick = (event) => {
    setNewAnchorEl(event.currentTarget);
  };

  const handleNewClose = () => {
    setNewAnchorEl(null);
  };

  const newOpen = Boolean(newAnchorEl);

  // State for switch account popover
  const [switchAnchorEl, setSwitchAnchorEl] = useState(null);

  const handleSwitchOpen = (event) => {
    setSwitchAnchorEl(event.currentTarget);
  };

  const handleSwitchClose = () => {
    setSwitchAnchorEl(null);
  };

  const switchOpen = Boolean(switchAnchorEl);

  const creationItems = [
    {
      title: 'Block',
      description: 'Create a single learning element',
      icon: <FaBox />,
    },
    {
      title: 'Unit',
      description: 'Group blocks into a focused lesson',
      icon: <FaCube />,
    },
    {
      title: 'Flow',
      description: 'Wrap knowledge into summaries',
      icon: <BsDiagram3 />,
    },
    {
      title: 'Stack',
      description: 'Full course built from paths and units',
      icon: <FaLayerGroup />,
    },
    {
      title: 'Workspace',
      description: 'Where everything lives and connects',
      icon: <FaHome />,
    },
  ];

  return (
    <>
      <aside className="w-20 bg-[#324054] text-white flex flex-col justify-between py-6 px-3 shadow-lg">
        {/* Top Section */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
            className="w-12 h-12 flex items-center justify-center rounded hover:text-[#F53E47] transition-colors"
          >
            <FaAlignJustify size={22} />
          </button>
          {/* <div className="text-3xl font-bold mb-6">N</div> */}
          <button
            onClick={handleNewClick}
            className="flex flex-col items-center justify-center w-10 h-14 text-xs font-medium hover:text-[#F53E47] transition-colors"
          >
            <Add sx={{ fontSize: 20 }} />
            <span className="mt-1 text-[12px]">New</span>
          </button>
          <nav className="flex flex-col items-center space-y-6 mt-2">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-10 h-14 text-xs font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[#F53E47]'
                      : 'text-white hover:text-[#F53E47] opacity-80'
                  }`
                }
              >
                <div className="text-inherit">{icon}</div>
                <span className="mt-1 text-inherit">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setShowSettingsPopup(true)}
            className="hover:text-[#F53E47]"
          >
            <Settings sx={{ fontSize: 20 }} />
          </button>
          <Avatar
            onClick={handleSwitchOpen}
            alt="User Avatar"
            src={avatar || 'https://i.pravatar.cc/49'} // fallback image
            sx={{ width: 32, height: 32 }}
          />
        </div>
      </aside>

      <NewPopover
        open={newOpen}
        anchorEl={newAnchorEl}
        onClose={handleNewClose}
      />
      <SwitchAccountPopover
        open={switchOpen}
        anchorEl={switchAnchorEl}
        onClose={handleSwitchClose}
        // accounts={[
        //   {
        //     avatar: 'https://i.pravatar.cc/42',
        //     label: 'Personal',
        //     email: 'neo@nookli.ai',
        //   },
        //   {
        //     avatar: 'https://i.pravatar.cc/31',
        //     label: 'Company',
        //     email: 'neo@nookli.ai',
        //   },
        // ]}
      />

      {/* Settings Modal */}
      {showSettingsPopup && (
        <SettingsPopup onClose={() => setShowSettingsPopup(false)} />
      )}
    </>
  );
};

export default Sidebar;
