import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCurrentUserStore = create(
  persist(
    (set) => ({
      currentUser: null,

      loginCurrentUser: (user) => set({ currentUser: user }),

      logoutCurrentUser: () => set({ currentUser: null }),

      getCurrentSession: () => {
        const { currentUser } = useCurrentUserStore.getState();
        return {
          accessToken: currentUser?.accessToken || null,
          refreshToken: currentUser?.refreshToken || null,
          tokenExpiry: currentUser?.tokenExpiry || null,
        };
      },
    }),
    {
      name: 'current-user-store',
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
