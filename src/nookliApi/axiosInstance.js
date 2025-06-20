import axios from "axios";
import { useCurrentUserStore } from "../redux/useCurrentUserStore";

const API = axios.create({
  baseURL: "https://nookli-fastapi-603706786782.us-central1.run.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    const store = useCurrentUserStore.getState();
    const session = store.getCurrentSession();
    const now = Math.floor(Date.now() / 1000);

    // ⏰ Check if token is expired or about to expire
    if (session?.tokenExpiry && now >= session.tokenExpiry - 10) {
      try {
        const refreshRes = await axios.post("https://api.nookli.ai/api/v1/auth/refresh", {
          refreshToken: session.refreshToken,
        });

        const newAccessToken = refreshRes.data.accessToken;
        const expiresIn = refreshRes.data.expiresIn || 3600; // fallback to 1 hour
        const newExpiry = now + expiresIn;

        const updatedUser = {
          ...store.currentUser,
          accessToken: newAccessToken,
          tokenExpiry: newExpiry,
        };

        store.loginCurrentUser(updatedUser);

        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return config;
      } catch (refreshErr) {
        console.error("Token refresh failed", refreshErr);
        store.logoutCurrentUser();
        return Promise.reject(refreshErr);
      }
    }

    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optionally handle 401 responses if you want to log out user
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useCurrentUserStore.getState().logoutCurrentUser();
    }
    return Promise.reject(error);
  }
);

export default API;
