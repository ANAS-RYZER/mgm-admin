import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateAppointment"],
    mutationFn: async ({
      appointmentId,
      data,
    }: {
      appointmentId: string;
      data: { status: string };
    }) => {
      const response = await api.patch(
        `/dashboard/admin/appointment/${appointmentId}/status`,
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
    },
  });
}
