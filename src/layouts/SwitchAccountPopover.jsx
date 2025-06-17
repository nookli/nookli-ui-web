import React, { useState } from 'react';
import { Popover, Box, Typography, Avatar } from '@mui/material';
import { useUserStore } from '../redux/useUserStore';
import { toast } from 'react-toastify';
import LoginPopup from './LoginPopup';

const SwitchAccountPopover = ({ open, anchorEl, onClose }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const user = useUserStore((state) => state.user);
  const userAccounts = useUserStore((state) => state.userAccounts);
  const login = useUserStore((state) => state.login);

  const handleAddAccount = () => {
    setShowLoginPopup(true);
    onClose();
  };

  const handleSwitchUser = (acc) => {
    login({
      user: acc.user,
      accessToken: acc.accessToken,
      refreshToken: acc.refreshToken,
    });
    toast.success(`Switched to ${acc.user?.email || 'another account'}`);
    onClose();
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px',
            padding: '16px',
            width: '300px',
          },
        }}
      >
        <Box textAlign="center">
          <Avatar
            src={user?.avatar || 'https://i.pravatar.cc/48'}
            sx={{ width: 48, height: 48, margin: '0 auto' }}
          />
          <Typography sx={{ mt: 1, fontWeight: 600, fontSize: '18px', color: '#F53E47' }}>
            Nookli
          </Typography>
          <Typography sx={{ fontSize: '14px', color: '#555' }}>
            {user?.email || 'unknown@example.com'}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {userAccounts?.map((acc, idx) => (
              <Box
                key={idx}
                onClick={() => handleSwitchUser(acc)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 2,
                  borderBottom: idx !== userAccounts.length - 1 ? '1px solid #eee' : 'none',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={acc.user?.avatar || 'https://i.pravatar.cc/150?img=' + (idx + 1)}
                  sx={{ width: 28, height: 28 }}
                />
                <Box>
                  <Typography sx={{ fontSize: 14 }}>
                    {acc.user?.name || 'Unnamed User'}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: '#777' }}>
                    {acc.user?.email || 'unknown@example.com'}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F53E47',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              height: 36,
              cursor: 'pointer',
            }}
            onClick={handleAddAccount}
          >
            Add Account
          </Box>
        </Box>
      </Popover>

      <LoginPopup open={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
    </>
  );
};

export default SwitchAccountPopover;
