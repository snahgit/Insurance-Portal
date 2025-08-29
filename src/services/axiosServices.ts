import axios from "axios";

const baseUrl = "https://app.snah.org/api/";

export const serviceAxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
  },
});

serviceAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("snah_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
