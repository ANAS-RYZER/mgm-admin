import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointments({page, limit, search}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["all-appointments", search, page, limit],
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/appointment?search=${search || ""}&page=${page || 1}&limit=${limit || 10}`,
      );
      console.log(res.data.appointments, "res.data")
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
