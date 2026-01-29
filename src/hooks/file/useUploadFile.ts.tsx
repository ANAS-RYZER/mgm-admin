import { useMutation } from "@tanstack/react-query";

type UploadPayload = {
  url: string;
  file: File;
  headers?: Record<string, string>;
};

export function useUploadFile() {
  return useMutation({
    mutationKey: ["upload-file"],
    mutationFn: async ({ url, file, headers }: UploadPayload) => {
      const response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return response;
    },
  });
}
