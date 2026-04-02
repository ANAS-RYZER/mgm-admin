import api from "@/lib/httpClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetAppointmentById(appointmentId: string) {
  return useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const response = await api.get(
        `/dashboard/admin/appointment/${appointmentId}`,
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!appointmentId,
  });
}
