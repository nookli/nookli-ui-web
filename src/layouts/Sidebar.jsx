import React, { useState } from 'react';
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
import { Avatar, Popover, Box, Typography } from '@mui/material';
import { FaBox, FaCube, FaProjectDiagram, FaLayerGroup, FaHome } from 'react-icons/fa';
import SettingsPopup from './SettingsPopup';

const navItems = [
  { to: '/dashboard/home', label: 'Home', icon: <Home fontSize="small" /> },
  { to: '/dashboard/workspaces', label: 'Workspace', icon: <Workspaces fontSize="small" /> },
  { to: '/dashboard/stacks', label: 'Stacks', icon: <Storage fontSize="small" /> },
  { to: '/dashboard/flows', label: 'Flows', icon: <Hub fontSize="small" /> },
  { to: '/dashboard/search', label: 'Search', icon: <Search fontSize="small" /> },
];

const Sidebar = () => {
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [newAnchorEl, setNewAnchorEl] = useState(null);

  const handleNewClick = (event) => {
    setNewAnchorEl(event.currentTarget);
  };

  const handleNewClose = () => {
    setNewAnchorEl(null);
  };

  const newOpen = Boolean(newAnchorEl);

  const creationItems = [
    {
      title: 'Block',
      description: 'Create a single learning element',
      icon: <FaBox  />
    },
    {
      title: 'Unit',
      description: 'Group blocks into a focused lesson',
      icon: <FaCube  />
    },
    {
      title: 'Flow',
      description: 'Wrap knowledge into shareable, controllable summaries',
      icon: <FaProjectDiagram  />
    },
    {
      title: 'Stack',
      description: 'Full course built from paths and units',
      icon: <FaLayerGroup  />
    },
    {
      title: 'Workspace',
      description: 'Where everything lives and connects',
      icon: <FaHome  />
    },
  ];

  return (
    <>
      <aside className="w-20 bg-[#324054] text-white flex flex-col justify-between py-6 px-3 shadow-lg">
        {/* Top Section */}
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold mb-6">N</div>
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
                  `flex flex-col items-center justify-center w-10 h-14 text-xs font-medium transition-colors duration-200 ${isActive ? 'text-[#F53E47]' : 'text-white hover:text-[#F53E47] opacity-80'
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
          <button onClick={() => setShowSettingsPopup(true)} className="hover:text-[#F53E47]">
            <Settings sx={{ fontSize: 20 }} />
          </button>
          <Avatar
            alt="User Avatar"
            src="https://i.pravatar.cc/40"
            sx={{ width: 32, height: 32 }}
          />
        </div>
      </aside>

      {/* New Item Popover */}
      <Popover
        open={newOpen}
        anchorEl={newAnchorEl}
        onClose={handleNewClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            width: '300px',
            padding: '6px',
            marginLeft: '8px',
            border: '1px solid #E5E7EB'
          }
        }}
      >
        <Box sx={{ p: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {creationItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  p: '4px 4px',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer'
                  }
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#F53E47',
                    borderRadius: '50%'
                  }}
                >
                  {React.cloneElement(item.icon, {
                    className: "text-white",
                    style: { width: '20px', height: '20px' },
                  })}
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#111827'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#6B7280',
                      fontSize: '12px',
                      lineHeight: '16px'
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Popover>

      {/* Settings Modal */}
      {showSettingsPopup && <SettingsPopup onClose={() => setShowSettingsPopup(false)} />}
    </>
  );
};

export default Sidebar;