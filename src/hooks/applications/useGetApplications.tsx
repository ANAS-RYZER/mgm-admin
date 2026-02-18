import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAllApplications({
  status,
  search,
  page,
  limit,
}: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["all-applications", status, search, page, limit],
    queryFn: async () => {
      const res = await api.get(
        `/agents/applications?status=${status || ""}&search=${search || ""}&page=${page || 1}&limit=${limit || 10}`,
      );
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
