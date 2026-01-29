import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/httpClient";
import { session } from "@/lib/session";


export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
    }) => {
      const res = await apiClient.post("/auth/login", payload);

      return res.data;
    },
    onSuccess: (res,variables) => {
  const { accessToken, refreshToken, sessionId } = res;
  session.setAuth({ accessToken, refreshToken, sessionId, email: variables.email, });

  if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
},

  });
};
