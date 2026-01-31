import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePresignedUpload } from "@/hooks/file/usePresignedUpload";
import { useUploadFile } from "@/hooks/file/useUploadFile.ts";
import { useGetPermanentUrl } from "@/hooks/file/useGetPermanentUrl";

type Props = {
  fieldConfig: {
    name: string;
    label?: string;
    accept?: string[];
    maxSize?: number;
    rules?: any;
    meta?: {
      refId: string;
      belongsTo: string;
      isPublic?: boolean;
      metadata?: Record<string, any>;
      dimensions?: string;
    };
    control?: any;
    colSpan?: string;
  };
};

export function ImageUploadController({ fieldConfig }: Props) {
  const {
    name,
    label = "Upload Image",
    accept = ["jpg", "jpeg", "png", "webp"],
    maxSize = 5 * 1024 * 1024,
    rules,
    meta,
  } = fieldConfig;
  console.log("meta", meta);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, setValue, setError, clearErrors, watch } = useFormContext();
  const value = watch(name);


  const { mutate: presign, isPending: presigning } = usePresignedUpload();
  const { mutate: upload, isPending: uploadingFile } = useUploadFile();
  const { mutate: resolveUrl, isPending: resolvingUrl } = useGetPermanentUrl();

  const uploading = presigning || uploadingFile || resolvingUrl;

  function validateFile(file: File) {
    const ext = file.type.split("/")[1];

    if (!accept.includes(ext)) {
      setError(name, { message: `Allowed: ${accept.join(", ")}` });
      return false;
    }

    if (file.size > maxSize) {
      setError(name, { message: `Max ${maxSize / 1024 / 1024}MB` });
      return false;
    }

    return true;
  }

  function processFile(file: File | null) {
    if (!file) return;

    clearErrors(name);
    if (!validateFile(file)) return;

    presign(
      {
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        refId: meta?.refId || "",
        belongsTo: meta?.belongsTo || "",
        isPublic: meta?.isPublic ?? false,
        metadata: meta?.metadata ?? {},
      },
      {
        onSuccess: ({ uploadUrl, requiredHeaders, assetS3Object }) => {
          upload(
            { url: uploadUrl, file, headers: requiredHeaders },
            {
              onSuccess: () => {
                resolveUrl(assetS3Object._id, {
                  onSuccess: (url) => {
                    setValue(name, url, { shouldValidate: true });
                  },
                  onError: () =>
                    setError(name, { message: "Failed to resolve image URL" }),
                });
              },
              onError: () => setError(name, { message: "Upload failed" }),
            },
          );
        },
        onError: () =>
          setError(name, { message: "Failed to generate upload URL" }),
      },
    );
  }

  function removeImage() {
    setValue(name, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ fieldState }) => {
        const error = fieldState.error?.message;

        return (
          <div className={`space-y-2 w-full ${fieldConfig.colSpan || ""}`}>
            <label
              className={cn("text-sm font-medium", error && "text-destructive")}
            >
              {label} {rules?.required && "*"}
            </label>

            {meta?.dimensions && (
              <p className="text-xs text-muted-foreground">
                Recommended: {meta.dimensions}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Upload Box */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-md p-5 flex flex-col items-center justify-center cursor-pointer transition",
                  error && "border-destructive",
                  uploading && "opacity-60 pointer-events-none",
                )}
                onClick={() => !uploading && fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept={accept.map((x) => `.${x}`).join(",")}
                  onChange={(e) => processFile(e.target.files?.[0] || null)}
                />

                {uploading ? (
                  <Skeleton className="h-8 w-8 rounded-full" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm">Click or drop image</p>
                    <p className="text-xs text-muted-foreground">
                      Max {maxSize / 1024 / 1024}MB
                    </p>
                  </>
                )}
              </div>

              {/* Preview */}
              <div className="relative border rounded-md overflow-hidden h-32">
                {value ? (
                  <img src={value} className="h-full w-full object-contain" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    No image
                  </div>
                )}

                {value && (
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    onClick={removeImage}
                    disabled={uploading}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );
      }}
    />
  );
}
