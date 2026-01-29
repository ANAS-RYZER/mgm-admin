import { useMutation } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export function useGetPermanentUrl() {
  return useMutation({
    mutationFn: async (assetId: string) => {
      const { data } = await api.get(`/assets/${assetId}/url`);
      return data.data.url;
    },
    mutationKey: ["get-permanent-url"],
  });
}
