import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetTopProducts = () => {
    return useQuery({
        queryKey: ["top-products",],
        queryFn: async () => {
            const res=await api.get("/admin-dashboard/top-products");
            return res.data.data;
        },
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
  });
};