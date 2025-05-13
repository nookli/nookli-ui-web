import React from 'react';
import { Popover, Box, Typography } from '@mui/material';
import { FaBox, FaCube, FaProjectDiagram, FaLayerGroup, FaHome } from 'react-icons/fa';
import { BsDiagram3 } from 'react-icons/bs';

const creationItems = [
  { title: 'Block', description: 'Create a single learning element', icon: <FaBox size={20} className="text-white" /> },
  { title: 'Unit', description: 'Group blocks into a focused lesson', icon: <FaCube size={20} className="text-white" /> },
  { title: 'Flow', description: 'Wrap knowledge into summaries', icon: <BsDiagram3 size={20} className="text-white" /> },
  { title: 'Stack', description: 'Full course built from paths and units', icon: <FaLayerGroup size={20} className="text-white" /> },
  { title: 'Workspace', description: 'Where everything lives and connects', icon: <FaHome size={20} className="text-white" /> },
];

const NewPopover = ({ open, anchorEl, onClose }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '12px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          width: '300px',
          padding: '6px',
          marginLeft: '8px',
          border: '1px solid #E5E7EB',
        },
      }}
    >
      <Box sx={{ py: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {creationItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                p: '8px 4px',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer',
                },
              }}
            >
              <div className={`p-2 mr-3 rounded-full bg-[#F53E47]`}>
                {React.cloneElement(item.icon, {
                })}
              </div>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px', color: '#111827' }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '12px' }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Popover>
  );
};

export default NewPopover;
