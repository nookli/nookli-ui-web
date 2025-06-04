import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import { toast } from 'react-toastify';
import { signin } from '../api/auth';
import { useUserStore } from '../redux/useUserStore';

const LoginPopup = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const response = await signin(credentials);
      const { accessToken, refreshToken, user } = response;

      useUserStore.getState().login({ user, accessToken, refreshToken });
      toast.success('Logged in as ' + user.email);
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          padding: 0,
          borderRadius: 2,
          width: '100%',
          maxWidth: '24rem', // tailwind max-w-md
        },
      }}
    >
      <div className="p-6 space-y-5 bg-white dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Login to another account</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 pt-2">
          <button
            onClick={onClose}
            className="w-1/2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={handleLogin}
            className="w-1/2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginPopup;
