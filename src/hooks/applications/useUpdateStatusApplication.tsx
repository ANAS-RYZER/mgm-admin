import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateApplicationStatusPayload {
  applicationId: string;
  status: "approved" | "rejected";
  rejectionReason?: string;
}

export default function useUpdateStatusApplication() {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, UpdateApplicationStatusPayload>({
    mutationKey: ["update-application-status"],
    mutationFn: async ({ applicationId, status, rejectionReason }) => {
      const response = await api.put(
        `/agents/application/${applicationId}/status`,
        { status, rejectionReason },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-application"] });
    },
  });
}
