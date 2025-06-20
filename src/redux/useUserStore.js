import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authMe } from '../api/auth';
import API from '../api/axiosInstance';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      userAccounts: [], // to support switch user
      loading: false,
      error: null,

      // Fetch current user data
      fetchUser: async () => {
        set({ loading: true, error: null });
        try {
          const token = get().accessToken;
          if (!token) throw new Error('No access token');
          const data = await authMe(token);
          set({ user: data, loading: false });
        } catch (err) {
          console.error('Failed to fetch user:', err);
          set({ error: err, loading: false });
        }
      },

      // Login and set main state
      login: ({ user, accessToken, refreshToken }) => {
        // Update default auth header
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        set({ user, accessToken, refreshToken });
      },

      // Logout clears all
      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        API.defaults.headers.common['Authorization'] = '';
      },

      // Add a user to the accounts list (overwrite if same email)
      addAccount: ({ user, accessToken, refreshToken }) => {
        const existing = get().userAccounts || [];
        const updated = [
          ...existing.filter((acc) => acc.user.email !== user.email),
          { user, accessToken, refreshToken },
        ];
        set({ userAccounts: updated });
      },

      // Switch to another user
      switchAccount: ({ user, accessToken, refreshToken }) => {
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        set({ user, accessToken, refreshToken });
      },

      // Optional: Update user object
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        userAccounts: state.userAccounts,
      }),
    },
  ),
);
