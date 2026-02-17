import api from "@/lib/httpClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateOrderPayload {
    productSku: string[];
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
            queryClient.invalidateQueries({ queryKey: ["appointment", appointmentId] });
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
}
