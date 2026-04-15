import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Breakdown {
  basePriceTotal: number;
  vaTotal: number;
  makingTotal: number;
  grossTotal: number;
  discountTotal: number;
  taxableTotal: number;
  cgstTotal: number;
  sgstTotal: number;
  grandTotal: number;
  commission: number;
  adminRevenue: number;
  commissionTotalPercentage: number;
}

interface CreateOrderPayload {
  productSku: string[];
  breakdown: Breakdown;
  totalPrice: number;
}

export default function useCreateOrder(appointmentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const response = await api.post(`/orders`, payload, {
        params: { appointmentId },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointment", appointmentId],
      });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
