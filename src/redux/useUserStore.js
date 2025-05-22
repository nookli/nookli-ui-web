import { create } from 'zustand';
import { authMe } from '../api/auth'; // adjust path as needed

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    const token = localStorage.getItem('accessToken'); // or however you store your token
    try {
      const data = await authMe(); // uses axios instance with interceptor
      set({ user: data, loading: false });
    } catch (err) {
      console.error("Failed to fetch user:", err);
      set({ error: err, loading: false });
    }
  },

  setUser: (user) => set({ user }),
}));
