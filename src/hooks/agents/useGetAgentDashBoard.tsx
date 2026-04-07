import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAgentDashboard(agentId: string) {
  return useQuery({
    queryKey: ["agentDashboard", agentId],
    queryFn: async () => {
      const res = await api.get(`admin/commissions/dashboard/${agentId}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!agentId,
  });
}
