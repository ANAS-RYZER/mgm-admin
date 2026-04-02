import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrder(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await api.get(`/orders/${orderId}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
