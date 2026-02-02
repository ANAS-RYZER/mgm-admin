import { useRef, type ChangeEvent, type DragEvent } from "react";
import get from "lodash/get";
import { X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import useMultiplePresignedUrl from "@/hooks/file/useMultiplePresignedUrl";
import useMultipleFileUpload from "@/hooks/file/useMultipleFileUpload";
import useGetMultipleFileUrl from "@/hooks/file/useGetMultipleFileUrl";

interface MultiImageUploaderProps {
  name: string;
  label: string;
  accept?: string[];
  rules?: any;
  disabled?: boolean;
  maxSize?: number;
  meta?: {
    refId: string;
    belongsTo: string;
    isPublic: boolean;
  };
  colSpan?: string;
}

export default function MultiImageUploadController({
  fieldConfig,
}: {
  fieldConfig: MultiImageUploaderProps;
}) {
  const {
    label = "Featured Images",
    name,
    accept = ["jpg", "jpeg", "png", "webp"],
    rules,
    disabled = false,
    maxSize = 5 * 1024 * 1024,
    meta,
    colSpan = "",
  } = fieldConfig;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    setError,
    control,
    formState: { errors },
    clearErrors,
    watch,
    setValue,
  } = useFormContext();

  const files: string[] = watch(name) || [];
  const error = get(errors, name)?.message as string;

  // ✅ destructured react-query mutations
  const { mutate: presign, isPending: presigning } = useMultiplePresignedUrl();
  const { mutate: upload, isPending: uploading } = useMultipleFileUpload();
  const { mutate: resolveUrl, isPending: resolving } = useGetMultipleFileUrl();

  const isUploading = presigning || uploading || resolving;

  function validateFiles(selected: File[]) {
    return selected.filter((file) => {
      const ext = file.type.split("/")[1];

      if (!accept.includes(ext)) {
        setError(name, {
          type: "manual",
          message: `Unsupported format: ${accept.join(", ")}`,
        });
        return false;
      }

      if (file.size > maxSize) {
        setError(name, {
          type: "manual",
          message: `File too large (max ${maxSize / 1024 / 1024}MB)`,
        });
        return false;
      }

      return true;
    });
  }

  function processFiles(selectedFiles: File[]) {
    if (!selectedFiles.length) return;

    clearErrors(name);

    const validFiles = validateFiles(selectedFiles);
    if (!validFiles.length) return;

    const payload = validFiles.map((file) => ({
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      refId: meta?.refId || "",
      belongsTo: meta?.belongsTo || "",
      isPublic: meta?.isPublic ?? false,
      metadata: {},
    }));

    // STEP 1 — PRESIGN BULK
    presign(payload, {
      onSuccess(presignedList: any) {
        const uploadedUrls: string[] = [];


        // STEP 2 — UPLOAD FILES PARALLEL
        presignedList.forEach((res: any, index: any) => {
          upload(
            { url: res.uploadUrl, file: validFiles[index] },
            {
              onSuccess() {
                console.log("res", res),

                resolveUrl(res.assetS3Object._id, {
                  onSuccess(url: any) {
                    uploadedUrls.push(url);

                    if (uploadedUrls.length === presignedList.length) {
                      setValue(name, [...files, ...uploadedUrls], {
                        shouldValidate: true,
                      });
                    }
                  },
                });
              },
            },
          );
        });
      },
      onError() {
        setError(name, { message: "Failed to generate upload URLs" });
      },
    });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files || []);
    processFiles(droppedFiles);
  }

  function removeImage(index: number) {
    const updated = [...files];
    updated.splice(index, 1);
    setValue(name, updated);

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className={`space-y-2 w-full ${fieldConfig.colSpan || ""}`}>
      <label className={cn("text-sm font-medium", error && "text-destructive")}>
        {label} {rules?.required && "*"}
      </label>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={() => (
            <div
              className={cn(
                "h-32 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition",
                error && "border-destructive",
                isUploading && "opacity-60 pointer-events-none",
              )}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                hidden
                multiple
                accept={accept.map((ext) => `.${ext}`).join(",")}
                onChange={handleFileChange}
                disabled={disabled || isUploading}
              />

              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Uploading...
                  </p>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 mb-2 text-muted-foreground" />
                  <p className="text-sm text-center">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Max {maxSize / 1024 / 1024}MB | {accept.join(", ")}
                  </p>
                </>
              )}
            </div>
          )}
        />

        {error && <p className="text-sm text-destructive mt-1">{error}</p>}

        {/* Preview Grid */}
        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isUploading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          )}

          {files.length > 0 ? (
            files.map((url, index) => (
              <div
                key={index}
                className="relative border rounded-md h-32 overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-contain"
                />

                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  disabled={isUploading}
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-32 bg-muted rounded-md col-span-full">
              <p className="text-sm text-muted-foreground">
                No images uploaded
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
