import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductById(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await api.get(`/products/${productId}`);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!productId,
  });
}
