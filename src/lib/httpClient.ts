import axios from "axios";
import router from "@/router/router";

// const BASE_URL = "https://test.ownmali.com/api";
const BASE_URL = "https://mgm-backend.vercel.app";  

// const BASE_URL = "http://localhost:5050";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const getSessionId = () => localStorage.getItem("sessionId");

const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);

const setRefreshToken = (token: string) =>
  localStorage.setItem("refreshToken", token);

const setSessionId = (id: string) =>
  localStorage.setItem("sessionId", id);

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("sessionId");
};

const logout = () => {
  clearTokens();
  if (window.location.pathname !== "/signin") {
    router.navigate("/signin", { replace: true });
  }
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, Promise.reject);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject({ message: "Network Error" });
    }

    const status = error.response.status;

    // Prevent infinite retry loop
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const sessionId = getSessionId();
        if (!sessionId || !refreshToken) {
          // If we can't refresh, the session is effectively invalid.
          logout();
          return Promise.reject({ message: "No refresh token" });
        }

        const { data } = await axios.post(
          `${BASE_URL}/admin/auth/refresh`,
          {
            sessionId,
            refreshToken,
          },
        );
        const tokenPayload = data?.data ?? data;
        const newAccessToken = tokenPayload?.accessToken;
        const newRefreshToken = tokenPayload?.refreshToken ?? refreshToken;
        const newSessionId = tokenPayload?.sessionId ?? sessionId;
        if (!newAccessToken) throw new Error("No new access token");
        if (!newRefreshToken) throw new Error("No new refresh token");
        if (!newSessionId) throw new Error("No new session id");

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setSessionId(newSessionId);
        // Force app state to restart with fresh credentials.
        window.location.reload();
        return Promise.reject({ message: "Session refreshed. Reloading..." });
      } catch (error) {
        logout();
        return Promise.reject({ message: "Session expired" });
      }
    }

    return Promise.reject(error);
  },
);

export default api;
