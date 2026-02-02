import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateStatusApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-application-status"],
    mutationFn: async ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: string;
    }) => {
      const response = await api.put(
        `/agents/application/${applicationId}/status`,
        { status },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-application"] });
    },
  });
}
