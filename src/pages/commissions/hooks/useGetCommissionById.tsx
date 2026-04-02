import { useQuery } from "@tanstack/react-query";
import api from "@/lib/httpClient";

export const useGetCommissionById = (commissionId: string) => {
    return useQuery({
        queryKey: ["commission", commissionId],
        queryFn: async () => {
            try {
                const res = await api.get(`/admin/commissions/${commissionId}`);
                return res.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        staleTime: 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
        enabled: !!commissionId,
    });
};