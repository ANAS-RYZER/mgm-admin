import api from "@/lib/httpClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useGetAllProducts({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["get-all-products", page, limit, search],
    queryFn: async () => {
      const res = await api.get("/products/all", {
        params: { page, limit, search },
      });
      return res.data;
    },

    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
