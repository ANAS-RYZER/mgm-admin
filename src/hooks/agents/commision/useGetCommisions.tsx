import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetCommisions(
  id: string,
  page: number,
  limit: number,
) {
  return useQuery({
    queryKey: ["commisions", id, page, limit],
    queryFn: async () => {
      const res = await api.get(
        `admin/commissions/list/${id}?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!id,
  });
}
