import api from "@/lib/httpClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useGetAllProducts() {
  return useQuery({
    queryKey: ["get-all-products"],
    queryFn: async () => {
      const res = await api.get("/products/all");
      return res.data.data;
    },
    
    staleTime: 60 * 1000,
    retry: 2,
  });
}
