import { useCurrentUserStore } from './useCurrentUserStore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserAccountsStore = create(
  persist(
    (set, get) => ({
      users: [],

      addUserAccount: (newUser) => {
        const existing = get().users.filter(
          (u) => u.email !== newUser.email
        );
        set({ users: [...existing, newUser] });
      },

      removeUserAccount: (email) => {
        const filtered = get().users.filter((u) => u.email !== email);
        set({ users: filtered });
      },

      switchAccount: (email) => {
        const user = get().users.find((u) => u.email === email);
        if (user) {
          useCurrentUserStore.getState().loginCurrentUser(user);
        }
      },
    }),
    {
      name: 'user-accounts-store',
      partialize: (state) => ({ users: state.users }),
    }
  )
);
