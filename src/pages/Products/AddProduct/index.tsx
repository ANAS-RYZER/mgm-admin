import { FormRenderer } from "@/components/forms/FormController";
import React, { useState } from "react";
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

const AddProduct = () => {
  const basicInfoFields = productBasicInfoConfig();
  const descInfoFields = prodcutDescInfoConfig();
  const goldSpecFields = prodcutGoldSpecConfig();
  const priceAndInventoryFields = prodcutPricingAndInventoryConfig();

  const { mutate: addProduct, isPending: isAdding } = useAddProduct();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const methods = useForm<ProductFormValues>({
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      categories: "",

      mrpPrice: "",
      discountedPrice: "",
      stockQuantity: "",

      image: "",
      gallery: [],

      goldSpecs: {
        karat: "",
        metal: "",
        goldWeight: "",
        grossWeight: "",
        makingCharges: "",
        purity: "",
      },

      stoneSpecs: [], // ✅ clean
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitted Product (raw):", data);

    // Remove 'category' if it exists (should use 'categories' instead)
    const { category, ...submitData } = data;
    
    // Build clean payload with only expected fields
    const cleanPayload: any = {
      sku: submitData.sku,
      name: submitData.name,
      description: submitData.description,
      categories: submitData.categories || category, // Use categories, fallback to category if needed
      mrpPrice: submitData.mrpPrice,
      discountedPrice: submitData.discountedPrice || 0,
      stockQuantity: submitData.stockQuantity,
      material: submitData.material,
      image: submitData.image,
      gallery: Array.isArray(submitData.gallery) ? submitData.gallery : [],
      goldSpecs: submitData.goldSpecs,
      stoneSpecs: Array.isArray(submitData.stoneSpecs) ? submitData.stoneSpecs : [],
    };

    // Remove undefined, null, or empty string values (except for required fields)
    Object.keys(cleanPayload).forEach((key) => {
      const value = cleanPayload[key];
      
      // Remove undefined or null values
      if (value === undefined || value === null) {
        delete cleanPayload[key];
        return;
      }
      
      // Handle empty strings - keep for required fields, remove for optional
      if (value === '' && !['sku', 'name', 'categories'].includes(key)) {
        delete cleanPayload[key];
        return;
      }
      
      // Validate image URL format
      if (key === 'image' && value && typeof value !== 'string') {
        console.warn('Invalid image value type:', typeof value, value);
        delete cleanPayload[key];
        return;
      }
      
      // Validate gallery is array of strings
      if (key === 'gallery' && Array.isArray(value)) {
        cleanPayload[key] = value.filter((url) => typeof url === 'string' && url.trim() !== '');
      }
    });

    console.log("Cleaned Payload:", cleanPayload);

    addProduct(
      cleanPayload,
      {
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
      },
    );
  };

  const handleSuccessDialogClose = () => {
    setIsSuccessDialogOpen(false);
    methods.reset();
  };

  const handleAddOtherItem = () => {
    setIsSuccessDialogOpen(false);
    methods.reset();
    // Stay on the same page to add another product
  };
  const sku = methods.watch("sku") || "";

  return (
    <AdminLayout title="Add Product">
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
              <h1 className="text-lg font-semibold ">Product Image</h1>
            </div>
            <hr />
            <FormRenderer
              control={methods.control}
              fields={productImageConfig(sku)}
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
              fields={productGalleryConfig(sku)}
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

        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Product Added Successfully!</DialogTitle>
              <DialogDescription>
                Your product has been added successfully. Would you like to add another product or close this dialog?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleSuccessDialogClose}
              >
                Cancel
              </Button>
              <Button onClick={handleAddOtherItem}>
                Add Other Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </FormProvider>
    </AdminLayout>
  );
};

export default AddProduct;
