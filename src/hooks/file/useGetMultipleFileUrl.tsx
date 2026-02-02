import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export default function useGetMultipleFileUrl() {
  return useMutation({
    mutationKey: ["bulk-file-url"],
    mutationFn: async (assetId: string) => {
      const { data } = await api.get(`/assets/${assetId}/url`);
      return data.data.url as string;
    },
  });
}
