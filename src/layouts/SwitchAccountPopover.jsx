import React, { useState } from 'react';
import { Popover, Box, Typography, Avatar } from '@mui/material';
import { useUserStore } from '../redux/useUserStore';
import { toast } from 'react-toastify';
import LoginPopup from './LoginPopup';

const SwitchAccountPopover = ({ open, anchorEl, onClose, accounts }) => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleAddAccount = () => {
        setShowLoginPopup(true);
        onClose(); // close popover when opening modal
    };

    const login = useUserStore((state) => state.login);

    const handleSwitchUser = (acc) => {
        login({
            user: {
                id: acc.id,
                name: acc.label,
                email: acc.email,
                role: acc.role || 'User',
            },
            accessToken: acc.accessToken,
            refreshToken: acc.refreshToken,
        });
        toast.success(`Switched to ${acc.label}`);
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
                    <Avatar src='https://i.pravatar.cc/49' sx={{ width: 48, height: 48, margin: '0 auto' }} />
                    <Typography sx={{ mt: 1, fontWeight: 600, fontSize: '18px', color: '#F53E47' }}>Nookli</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#555' }}>neosmith@Nookli.ai</Typography>
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
                    >
                        Add Account
                    </Box>
                    {accounts?.map((acc, idx) => (
                        <Box
                            key={idx}
                            onClick={() => handleSwitchUser(acc)} // Add this line
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                py: 2,
                                borderBottom: idx !== accounts.length - 1 ? '1px solid #eee' : 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar src={acc.avatar} sx={{ width: 28, height: 28 }} />
                            <Box>
                                <Typography sx={{ fontSize: 14 }}>{acc.label}</Typography>
                                <Typography sx={{ fontSize: 12, color: '#777' }}>{acc.email}</Typography>
                            </Box>
                        </Box>
                    ))}
                    <Typography
                        sx={{
                            mt: 2,
                            fontSize: 14,
                            color: '#999',
                            cursor: 'pointer',
                        }}
                        onClick={handleAddAccount}

                    >
                        + Add another account
                    </Typography>
                </Box>
            </Popover>
            <LoginPopup open={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
        </>
    );
};

export default SwitchAccountPopover;
