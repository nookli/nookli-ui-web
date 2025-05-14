import axios from "axios";

const API = axios.create({
  baseURL: "https://your-backend-domain.com", // Replace with your backend
});

export const signin = async (credentials) => {
  const response = await API.post("/auth/signin", credentials);
  return response.data;
};
