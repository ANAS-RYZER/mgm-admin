import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllAgents() {
  return useQuery({
    queryKey: ["all-agents"],
    queryFn: async () => {
      const res = await api.get(`/agents`);
      return res.data.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
  });
}
