import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrderListCols({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["all-orders", search, page, limit],
    queryFn: async () => {
      const res = await api.get(
        `/orders?search=${search || ""}&page=${page || 1}&limit=${limit || 10}`,
      );
      console.log(res.data, "res.data");
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
