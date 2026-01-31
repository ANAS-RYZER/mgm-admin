import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetApplicationById({ id }: { id: string }) {
  return useQuery({
    queryKey: ["get-application", id],
    queryFn: async () => {
      const res = await api.get(`/agents/applications/${id}`);
      return res.data.data;
    },
    staleTime: 1 * 60 * 1000,
    enabled: !!id,
    retry: 2,
  });
}
