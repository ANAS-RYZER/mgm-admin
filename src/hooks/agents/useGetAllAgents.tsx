import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllAgents({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["all-agents", page, limit, search],
    queryFn: async () => {
      const res = await api.get(
        `/agents?page=${page || 1}&limit=${limit || 10}&search=${search || ""}`,
      );
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
