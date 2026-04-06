import { FormRenderer } from "@/components/forms/FormController";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import {
  prodcutDescInfoConfig,
  prodcutGoldSpecConfig,
  prodcutPricingAndInventoryConfig,
  productBasicInfoConfig,
  ProductFormValues,
  productGalleryConfig,
  productImageConfig,
  productStoneSpecsConfig,
  commisionConfig,
} from "./formConfig/addProductConfig";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import useAddProduct from "@/hooks/product/useAddProduct";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import useGetProductById from "@/hooks/product/useGetProductById";
import useUpdateProduct from "@/hooks/product/useUpdateProduct";
import LoadingSpinner from "@/components/LoadingSpinner";

const AddProduct = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  // Draft ID for uploads before product/SKU exists (backend generates SKU)
  const [uploadRefId, setUploadRefId] = useState(
    () => `draft-${crypto.randomUUID()}`,
  );

  const basicInfoFields = productBasicInfoConfig();
  const descInfoFields = prodcutDescInfoConfig();
  const priceAndInventoryFields = prodcutPricingAndInventoryConfig();

  const { mutate: addProduct, isPending: isAdding } = useAddProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { data: existingProduct, isFetching: isProductLoading } =
    useGetProductById(id!!);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const methods = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      categories: "",
      material: "",

      calculatedTotalCost: "",
      mrpPrice: "",
      discountedPrice: "",
      discountedPercentage: "",
      netprice: "",

      // New pricing fields
      grossPrice: "",
      cgst: "",
      sgst: "",
      va: "",
      multiplestonePrice: "",

      stockQuantity: "",

      image: "",
      gallery: [],

      netWeight: "",
      goldPrice: "",

      goldSpecs: {
        karat: "",
        metal: "",
        goldWeight: "",
        netWeight: "",
      },
      makingChanges: "",

      stoneSpecs: [], // ✅ clean
    },
  });

  useEffect(() => {
    if (isEdit && existingProduct) {
      methods.reset({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        categories: existingProduct.categories || "",
        material: existingProduct.material || "",
        mrpPrice: existingProduct.mrpPrice || "",
        discountedPrice: existingProduct.discountedPrice || "",
        discountedPercentage: existingProduct.discountedPercentage || "",
        netprice: existingProduct.netprice || "",

        grossPrice: existingProduct.grossPrice || "",
        cgst: existingProduct.cgst || "",
        sgst: existingProduct.sgst || "",
        va: existingProduct.va || "",
        multiplestonePrice: existingProduct.multiplestonePrice || "",

        stockQuantity: existingProduct.stockQuantity || "",

        image: existingProduct.image || "",
        gallery: existingProduct.gallery || [],

        goldPrice: existingProduct.goldPrice || "",

        makingChanges: existingProduct.makingChanges || "",

        goldSpecs: {
          karat: existingProduct.goldSpecs?.karat || "",
          metal: existingProduct.goldSpecs?.metal || "",
          goldWeight: existingProduct.goldSpecs?.goldWeight || "",
          netWeight: existingProduct.goldSpecs?.netWeight || "",
        },

        stoneSpecs: (existingProduct.stoneSpecs || []).map((stone: any) => ({
          ...stone,
          color: stone.color
            ? {
                type: stone.color.type,
                value: stone.color.value,
              }
            : null,
        })),
      });
    }
  }, [existingProduct, isEdit]);

  const metal = useWatch({
    control: methods.control,
    name: "goldSpecs.metal",
    defaultValue: "",
  });
  const goldSpecFields = prodcutGoldSpecConfig(metal);

  const onSubmit = (data: any) => {
    console.log("Submitted Product (raw):", data);

    // Remove 'category' if it exists (should use 'categories' instead)
    const { category, ...submitData } = data;

    // Build clean payload with only expected fields
    const cleanPayload: any = {
      name: submitData.name,
      description: submitData.description,
      categories: submitData.categories || category, // Use categories, fallback to category if needed
      calculatedTotalCost: submitData.calculatedTotalCost,
      mrpPrice: submitData.mrpPrice,
      discountedPrice: submitData.discountedPrice ?? 0,
      discountedPercentage: submitData.discountedPercentage ?? 0,
      netprice: submitData.netprice,

      // New pricing fields
      grossPrice: submitData.grossPrice,
      cgst: submitData.cgst,
      sgst: submitData.sgst,
      va: submitData.va,
      multiplestonePrice: submitData.multiplestonePrice,

      stockQuantity: submitData.stockQuantity,
      material: submitData.material,
      image: submitData.image,
      gallery: Array.isArray(submitData.gallery) ? submitData.gallery : [],

      netWeight:
        submitData.netWeight !== "" ? Number(submitData.netWeight) : undefined,
      goldPrice:
        submitData.goldPrice !== "" ? Number(submitData.goldPrice) : undefined,

      makingChanges: Number(submitData.makingChanges) || 0,
      goldSpecs: {
        karat: submitData.goldSpecs?.karat,
        metal: submitData.goldSpecs?.metal,
        goldWeight: Number(submitData.goldSpecs?.goldWeight) || 0,
        netWeight: Number(submitData.goldSpecs?.netWeight) || 0,
      },
      stoneSpecs: Array.isArray(submitData.stoneSpecs)
        ? submitData.stoneSpecs.map((stone: any) => ({
            ...stone,
            quantity:
              stone.quantity !== "" ? Number(stone.quantity) : undefined,
            stoneprice:
              stone.stoneprice !== "" ? Number(stone.stoneprice) : undefined,
          }))
        : [],
      commissionPercentage: submitData.commissionPercentage,
      uploadRefId, // Backend uses this to associate files uploaded with this draft ID
    };

    // Ensure all numeric fields are actual Numbers
    const numericFields = [
      "calculatedTotalCost",
      "mrpPrice",
      "discountedPrice",
      "discountedPercentage",
      "netprice",
      "grossPrice",
      "cgst",
      "sgst",
      "va",
      "multiplestonePrice",
      "stockQuantity",
      "netWeight",
      "goldPrice",
    ];

    numericFields.forEach((field) => {
      if (
        cleanPayload[field] !== undefined &&
        cleanPayload[field] !== null &&
        cleanPayload[field] !== ""
      ) {
        cleanPayload[field] = Number(cleanPayload[field]);
      }
    });

    // Deep clean goldSpecs
    if (cleanPayload.goldSpecs) {
      Object.keys(cleanPayload.goldSpecs).forEach((key) => {
        const val = cleanPayload.goldSpecs[key];
        if (val === undefined || val === null || val === "") {
          delete cleanPayload.goldSpecs[key];
        } else if (["goldWeight", "makingCharges"].includes(key)) {
          cleanPayload.goldSpecs[key] = Number(val);
        }
      });
    }

    // Deep clean stoneSpecs
    if (Array.isArray(cleanPayload.stoneSpecs)) {
      cleanPayload.stoneSpecs = cleanPayload.stoneSpecs.map((stone: any) => {
        const cleaned = { ...stone };
        if (cleaned.quantity !== undefined)
          cleaned.quantity = Number(cleaned.quantity) || 0;
        if (cleaned.stoneprice !== undefined)
          cleaned.stoneprice = Number(cleaned.stoneprice) || 0;
        return cleaned;
      });
    }

    // Remove undefined, null, or empty string values (except for required fields)
    Object.keys(cleanPayload).forEach((key) => {
      const value = cleanPayload[key];

      // Remove undefined or null values
      if (value === undefined || value === null) {
        delete cleanPayload[key];
        return;
      }

      // Handle empty strings - keep for required fields, remove for optional
      if (value === "" && !["sku", "name", "categories"].includes(key)) {
        delete cleanPayload[key];
        return;
      }

      // Validate image URL format
      if (key === "image" && value && typeof value !== "string") {
        console.warn("Invalid image value type:", typeof value, value);
        delete cleanPayload[key];
        return;
      }

      // Validate gallery is array of strings
      if (key === "gallery" && Array.isArray(value)) {
        cleanPayload[key] = value.filter(
          (url) => typeof url === "string" && url.trim() !== "",
        );
      }
    });

    console.log("Cleaned Payload:", cleanPayload);
    if (isEdit) {
      setIsSuccessDialogOpen(true);
      updateProduct(
        { id: id!, payLoad: cleanPayload },
        {
          onSuccess: (data) => {
            console.log("Product updated successfully:", data);
            setIsSuccessDialogOpen(true);
          },
          onError: (error: any) => {
            console.error("Error updating product:", error);
            let errorMessage = "Failed to update product. Please try again.";

            // Handle different error response formats
            if (error?.response?.data?.message) {
              const message = error.response.data.message;
              // If message is an array, join it
              errorMessage = Array.isArray(message)
                ? message.join(", ")
                : message;
            } else if (error?.message) {
              errorMessage = error.message;
            }

            toast.error("Error", {
              description: errorMessage,
            });
          },
        },
      );
    } else {
      setIsSuccessDialogOpen(true);
      addProduct(cleanPayload, {
        onSuccess: (data) => {
          console.log("Product added successfully:", data);
          setIsSuccessDialogOpen(true);
        },
        onError: (error: any) => {
          console.error("Error adding product:", error);
          let errorMessage = "Failed to add product. Please try again.";

          // Handle different error response formats
          if (error?.response?.data?.message) {
            const message = error.response.data.message;
            // If message is an array, join it
            errorMessage = Array.isArray(message)
              ? message.join(", ")
              : message;
          } else if (error?.message) {
            errorMessage = error.message;
          }

          toast.error("Error", {
            description: errorMessage,
          });
          // Don't reset form on error - keep values
        },
      });
    }
  };

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
    methods.reset();
  };

  const handleAddOtherItem = () => {
    setIsSuccessDialogOpen(false);
    methods.reset();
    setUploadRefId(`draft-${crypto.randomUUID()}`); // Fresh refId for next product's uploads
  };
  return (
    <AdminLayout
      title="Add a Product"
      description="Add a new product to the inventory"
      searchBar={false}
      isBack={true}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                1
              </div>
              <h1 className="text-lg font-semibold ">Basic Information</h1>
            </div>
            <hr />
            <FormRenderer control={methods.control} fields={basicInfoFields} />
          </div>
          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                2
              </div>
              <h1 className="text-lg font-semibold ">Product Description</h1>
            </div>
            <hr />

            <FormRenderer control={methods.control} fields={descInfoFields} />
          </div>

          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                3
              </div>
              <h1 className="text-lg font-semibold ">Gold Specifications</h1>
            </div>
            <hr />

            <FormRenderer control={methods.control} fields={goldSpecFields} />
          </div>

          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                4
              </div>
              <h1 className="text-lg font-semibold ">Stone Specifications</h1>
            </div>
            <hr />{" "}
            <FormRenderer
              control={methods.control}
              fields={productStoneSpecsConfig()}
            />
          </div>

          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                5
              </div>
              <h1 className="text-lg font-semibold ">Pricing & Inventory</h1>
            </div>
            <hr />

            <FormRenderer
              control={methods.control}
              fields={priceAndInventoryFields}
            />
          </div>

          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                6
              </div>
              <h1 className="text-lg font-semibold ">Commision</h1>
            </div>
            <hr />

            <FormRenderer
              control={methods.control}
              fields={commisionConfig()}
            />
          </div>

          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                6
              </div>
              <h1 className="text-lg font-semibold ">Product Image</h1>
            </div>
            <hr />
            <FormRenderer
              control={methods.control}
              fields={productImageConfig(uploadRefId)}
            />
          </div>
          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                7
              </div>
              <h1 className="text-lg font-semibold ">Product Gallery</h1>
            </div>
            <hr />
            <FormRenderer
              control={methods.control}
              fields={productGalleryConfig(uploadRefId)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => methods.reset()}
              className="shadow-none text-black px-4 py-2 border !border-black/20 bg-transparent rounded-md hover:text-white"
              disabled={isAdding}
            >
              Cancel
            </Button>

            <Button type="submit" className="rounded-md" disabled={isAdding}>
              {isAdding ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>

        <Dialog open={isSuccessDialogOpen}>
          <DialogContent className="sm:max-w-[425px] text-center">
            {isAdding || isUpdating ? (
              <div className="py-10 flex flex-col items-center gap-4">
                <LoadingSpinner
                  label={isEdit ? "Updating product..." : "Creating product..."}
                />
                <p className="text-sm text-muted-foreground">
                  Please wait, magic is happening ✨
                </p>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>
                    {isEdit
                      ? "Product Updated Successfully"
                      : "Product Created Successfully"}
                  </DialogTitle>

                  <DialogDescription>
                    {isEdit
                      ? "Your changes have been saved."
                      : "Your product has been added successfully."}
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-center gap-3">
                  <Button
                    variant={isEdit ? "default" : "outline"}
                    onClick={handleSuccessDialogClose}
                  >
                    Close
                  </Button>

                  {!isEdit && (
                    <Button onClick={handleAddOtherItem}>Add Another</Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </FormProvider>
    </AdminLayout>
  );
};

export default AddProduct;
