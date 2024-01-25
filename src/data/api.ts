import axios from "axios";
export const api = axios.create({
  baseURL: "https://localhost/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
