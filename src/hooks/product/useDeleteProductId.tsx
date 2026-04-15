import api from "@/lib/httpClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useDeleteProductId() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async (productId: string) => {
      const res = await api.delete(`/products/delete/${productId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-products"] });
    },
  });
}
