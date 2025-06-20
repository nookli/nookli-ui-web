import React, { useState } from 'react';
import { Popover, Box, Typography, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import LoginPopup from './LoginPopup';
import { useCurrentUserStore } from '../redux/useCurrentUserStore';
import { useUserAccountsStore } from '../redux/useUserAccountsStore';

const SwitchAccountPopover = ({ open, anchorEl, onClose }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const allUsersSessions = useUserAccountsStore((state) => state.users);
  const switchAccount = useUserAccountsStore((state) => state.switchAccount);
  const removeUserAccount = useUserAccountsStore(
    (state) => state.removeUserAccount,
  );

  const handleAddAccount = () => {
    setShowLoginPopup(true);
    onClose();
  };

  const handleSwitchUser = (acc) => {
    const targetEmail = acc.email;
    const currentEmail = currentUser?.email;

    if (currentEmail === targetEmail) {
      toast.warning('You are already using this account.');
      return;
    }

    switchAccount(targetEmail);

    setTimeout(() => {
      const updatedEmail = useCurrentUserStore.getState().currentUser?.email;
      if (updatedEmail === targetEmail) {
        toast.success(`Switched to ${targetEmail}`);
      } else {
        toast.error('Failed to switch account.');
      }
      onClose();
    }, 100);
  };

  const handleLogout = () => {
    const email = currentUser?.email;
    if (!email) return;

    // Remove account session
    removeUserAccount(email);

    // Clear current user
    setCurrentUser(null);

    toast.success('Logged out successfully.');
    onClose();
  };

  const otherUsers = allUsersSessions?.filter(
    (acc) => acc.email !== currentUser?.email,
  );

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
            borderRadius: 2,
            p: 2,
            width: 300,
          },
        }}
      >
        <Box textAlign="center">
          <Avatar
            src={currentUser?.avatar || 'https://i.pravatar.cc/48'}
            sx={{ width: 48, height: 48, mx: 'auto' }}
          />
          <Typography
            sx={{ mt: 1, fontWeight: 600, fontSize: 18, color: '#F53E47' }}
          >
            {currentUser?.firstName + ' ' + currentUser?.lastName ||
              'unknown@example.com'}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#555' }}>
            {currentUser?.email || 'unknown@example.com'}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {otherUsers.length > 0 ? (
              otherUsers.map((acc, idx) => (
                <Box
                  key={acc.email}
                  onClick={() => handleSwitchUser(acc)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                    borderBottom:
                      idx !== otherUsers.length - 1 ? '1px solid #eee' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    src={
                      acc?.avatar || `https://i.pravatar.cc/150?img=${idx + 1}`
                    }
                    sx={{ width: 28, height: 28 }}
                  />
                  <Box>
                    <Typography sx={{ fontSize: 14 }}>
                      {acc?.firstName + ' ' + acc?.lastName || 'Unnamed User'}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: '#777' }}>
                      {acc?.email || 'unknown@example.com'}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography sx={{ mt: 2, fontSize: 13, color: '#999' }}>
                No other users found. Click “Add Account” to login.
              </Typography>
            )}
          </Box>

          <Box
            onClick={handleAddAccount}
            sx={{
              mt: 3,
              backgroundColor: '#F53E47',
              color: 'white',
              fontWeight: 500,
              borderRadius: 1,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            Add Account
          </Box>

          <Box
            onClick={handleLogout}
            sx={{
              mt: 2,
              backgroundColor: '#eee',
              color: '#333',
              fontWeight: 500,
              borderRadius: 1,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            Logout
          </Box>
        </Box>
      </Popover>

      <LoginPopup
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </>
  );
};

export default SwitchAccountPopover;
