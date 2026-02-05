import axios from "axios";

// const BASE_URL = "https://test.ownmali.com/api";
const BASE_URL = "https://mgm-backend.vercel.app";  
//  const BASE_URL = "http://localhost:5050";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};


const logout = () => {
  clearTokens();
  window.location.href = "/signin";
};


api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  Promise.reject
);


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
        if (!refreshToken) {
          logout();
          return Promise.reject({ message: "No refresh token" });
        }

        const { data } = await axios.post(`${BASE_URL}/admin/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = data?.data?.accessToken;
        if (!newAccessToken) throw new Error("No new access token");

        setAccessToken(newAccessToken);

        // Update request & retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch {
        logout();
        return Promise.reject({ message: "Session expired" });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
