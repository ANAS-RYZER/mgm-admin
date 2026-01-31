import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllApplications({ status }: { status?: string }) {
  return useQuery({
    queryKey: ["all-applications", status],
    queryFn: async () => {
      const res = await api.get(`/agents/applications?status=${status || ""}`);
      return res.data.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
  });
}
