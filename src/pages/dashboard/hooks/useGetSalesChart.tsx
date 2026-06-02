import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetSalesOverview = () => {
    return useQuery({
        queryKey: ["sales-overview",],
        queryFn: async () => {
            const res=await api.get("/admin-dashboard/sales-overview");
            return res.data.data;
        },
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
  });
};