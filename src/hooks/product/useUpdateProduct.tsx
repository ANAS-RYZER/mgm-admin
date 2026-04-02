import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-product"],
    mutationFn: async ({ id, payLoad }: { id: string; payLoad: any }) => {
      const res = await api.put(`/products/update/${id}`, payLoad);
      return res.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
