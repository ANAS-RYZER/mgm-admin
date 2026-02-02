import api from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

type BulkPresignPayload = Array<{
  fileName: string;
  fileSize: number;
  mimeType: string;
  refId: string;
  belongsTo: string;
  isPublic?: boolean;
  metadata?: Record<string, any>;
}>;

export default function useMultiplePresignedUrl() {
  return useMutation({
    mutationKey: ["bulk-presign-upload"],
    mutationFn: async (files: BulkPresignPayload) => {
      const { data } = await api.post("/assets/upload-bulk", { files });
      return data.data; // array of presigned objects
    },
  });
}
