import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointments(searchTerm?: string) {
  return useQuery({
    queryKey: ["all-appointments", searchTerm],
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/appointment?search=${searchTerm || ""}`,
      );
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
