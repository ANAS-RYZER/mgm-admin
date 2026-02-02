import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export function usePresignedUpload() {
  return useMutation({
    mutationFn: async (payload: {
      fileName: string;
      fileSize: number;
      mimeType: string;
      refId: string;
      belongsTo: string;
      isPublic?: boolean;
      metadata?: Record<string, any>;
    }) => {
      const { data } = await api.post("/assets/upload-single", payload);
      return data.data;
    },
    mutationKey: ["presign-upload"],
  });
}
