import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetCommissionSummary = () => {
    return useQuery({
        queryKey: ["commission-summary",],
        queryFn: async () => {
            const res=await api.get("/admin-dashboard/commission-summary");
            return res.data.data;
        },
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
  });
};