import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetBasicDetails(agentId?: string) {
  return useQuery({
    queryKey: ["agent-basic-details", agentId],
    queryFn: async () => {
      const res = await api.get(`/admin/commissions/basic/${agentId}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!agentId, // Only run this query if agentId is provided
    refetchOnWindowFocus: false, // Optional: prevent refetching on window focus
  });
}
