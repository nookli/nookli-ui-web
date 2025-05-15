import axios from "axios";

const API = axios.create({
  baseURL: "https://api.nookli.ai/", // Replace with your backend
});

export const signin = async (credentials) => {
  const response = await API.post("auth/signin"
    , credentials
  );
  return response.data;
};
export const signup = async (payload) => {
  const response = await API.post("auth/signup"
    , payload
  );
  return response.data;
};

export const forgotPassword = async (credentials) => {
  const response = await API.post("/auth/password/forgot"
    , credentials
  );
  return response.data;
};
