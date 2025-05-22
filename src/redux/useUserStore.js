import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authMe } from '../api/auth';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,

      fetchUser: async () => {
        set({ loading: true, error: null });
        try {
          const data = await authMe(); // uses interceptor with stored token
          set({ user: data, loading: false });
        } catch (err) {
          console.error("Failed to fetch user:", err);
          set({ error: err, loading: false });
        }
      },

      login: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken }),

      logout: () => set({ user: null, accessToken: null, refreshToken: null }),

      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store', // localStorage key
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
