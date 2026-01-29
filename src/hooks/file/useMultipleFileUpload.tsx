import { useMutation } from "@tanstack/react-query";

export default function useMultipleFileUpload() {
  return useMutation({
    mutationKey: ["bulk-file-upload"],
    mutationFn: async ({
      url,
      file,
      headers,
    }: {
      url: string;
      file: File;
      headers?: Record<string, string>;
    }) => {
      return fetch(url, {
        method: "PUT",
        body: file,
        headers,
      });
    },
  });
}
