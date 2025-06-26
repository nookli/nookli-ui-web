import axios from "axios";
import { useCurrentUserStore } from "../redux/useCurrentUserStore";
import { useUserAccountsStore } from "../redux/useUserAccountsStore";

const nookliAPI = axios.create({
  baseURL: "https://nookli-fastapi-603706786782.us-central1.run.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Request Interceptor – Just attach token, no refresh here
nookliAPI.interceptors.request.use(
  (config) => {
    const session = useCurrentUserStore.getState().getCurrentSession();
    if (session?.accessToken) {
      config.headers["Authorization"] = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Response Interceptor – Only refresh on 401 (Invalid/Expired Token)
nookliAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isTokenError = error.response?.data?.detail === "Invalid or expired token";
    const shouldRetry = !originalRequest._retry;

    if (isUnauthorized && isTokenError && shouldRetry) {
      originalRequest._retry = true;

      const currentUserStore = useCurrentUserStore.getState();
      const userAccountsStore = useUserAccountsStore.getState();
      const session = currentUserStore.getCurrentSession();
      const now = Math.floor(Date.now() / 1000);

      try {
        const refreshRes = await axios.post("https://api.nookli.ai/api/v1/auth/token/refresh", {
          refreshToken: session.refreshToken,
        });

        const newAccessToken = refreshRes.data.accessToken;
        const newRefreshToken = refreshRes.data.refreshToken || session.refreshToken;
        const expiresIn = refreshRes.data.expiresIn || 3600;
        const newExpiry = now + expiresIn;

        const prevUser = currentUserStore.currentUser;

        if (prevUser) {
          const updatedUser = {
            ...prevUser,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            tokenExpiry: newExpiry,
          };

          currentUserStore.loginCurrentUser(updatedUser);
          userAccountsStore.updateUserAccessToken(
            updatedUser.email,
            newAccessToken,
            newExpiry
          );
        }

        // 🔁 Retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return nookliAPI(originalRequest);
      } catch (refreshErr) {
        console.error("🔴 Token refresh failed", refreshErr);
        currentUserStore.logoutCurrentUser();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default nookliAPI;
