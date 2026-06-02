import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetDashboardSummary = () => {
    return useQuery({
        queryKey: ["dashboard-summary",],
        queryFn: async () => {
            const res=await api.get("/admin-dashboard/summary");
            return res.data.data;
        },
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
  });
};