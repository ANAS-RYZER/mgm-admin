import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export default function useGetAllProducts() {
    
  return useMutation({
    mutationKey: ["get-all-products"],
    mutationFn: async (payLoad) => {
      const res = await api.get("/products/all");
      return res.data;
    },
  });
}
