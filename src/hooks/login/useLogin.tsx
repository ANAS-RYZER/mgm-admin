import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export const useLogin= () => {
  return useMutation({
    // mutationKey: ["login"],
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await api.post("/admin/auth/login", payload);
      console.log("response",res);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("sessionId", data.sessionId);
    },
  });
}

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await api.post("/admin/auth/refresh", { sessionId });
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
    },
  });
};
