import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export default function useAddProduct() {
  return useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (payLoad) => {
      const res = await api.post("/products/add-product", payLoad);
      return res.data.data;
    },
  });
}
