import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCurrentUserStore = create(
  persist(
    (set, get) => ({
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

      updateAccessToken: (accessToken, refreshToken) => {
        const { currentUser } = get();
        if (currentUser) {
          set({
            currentUser: {
              ...currentUser,
              accessToken,
              refreshToken,
            },
          });
        }
      },
    }),
    {
      name: 'current-user-store',
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
