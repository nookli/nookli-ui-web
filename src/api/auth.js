import API from "./axiosInstance";

export const signin = async (credentials) => {
  try {
    const response = await API.post("auth/signin", credentials);
    return response.data;
  } catch (error) {
    console.error("Signin error:", error);
    throw error;
  }
};

export const signup = async (payload) => {
  try {
    const response = await API.post("auth/signup", payload);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const forgotPassword = async (credentials) => {
  try {
    const response = await API.post("auth/password/forgot", credentials);
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

export const googleAuth = async (credentials) => {
  try {
    const response = await API.post("auth/oauth/google", credentials);
    return response.data;
  } catch (error) {
    console.error("Google auth error:", error);
    throw error;
  }
};

export const authMe = async (token) => {
  try {
    const response = await API.get("auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("AuthMe error:", error);
    throw error;
  }
};

