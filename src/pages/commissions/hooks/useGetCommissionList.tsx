import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetCommissionList = ({page, limit, search}: {page?: number, limit?: number, search?: string}) => {
    return useQuery({
        queryKey: ["commission-list", page, limit, search],
        queryFn: async () => {
            try {
                const res = await api.get(`/admin/commissions?page=${page || 1}&limit=${limit || 10}&search=${search || ""}`);
                return res.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
  });
};