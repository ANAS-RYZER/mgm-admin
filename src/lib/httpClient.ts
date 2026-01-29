import axios from "axios";
import { session } from "./session";

export const apiClient = axios.create({
  baseURL: "http://localhost:5050/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config:any) => {
  const token = session.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


