import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdatePrice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-price"],
    mutationFn: async ({ id, price }: { id: string; price: number }) => {
      const res = await api.put(`/prices/${id}`, { price });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    },
  });
}
