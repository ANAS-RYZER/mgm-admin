import { FormRenderer } from "@/components/forms/FormController";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
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

const AddProduct = () => {
  const basicInfoFields = productBasicInfoConfig();
  const descInfoFields = prodcutDescInfoConfig();
  const goldSpecFields = prodcutGoldSpecConfig();
  const priceAndInventoryFields = prodcutPricingAndInventoryConfig();

  const { mutate: addProduct, isPending: isAdding } = useAddProduct();

  const methods = useForm<ProductFormValues>({
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      category: "",

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
    console.log("Submitted Product:", data);

    addProduct(
      { ...data },
      {
        onSuccess: (data) => {
          console.log("Product added successfully:", data);
        },
        onError: (error) => {
          console.error("Error adding product:", error);
        },
      },
    );

    methods.reset();
  };

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
                4
              </div>
              <h1 className="text-lg font-semibold ">Gold Specifications</h1>
            </div>
            <hr />

            <FormRenderer control={methods.control} fields={goldSpecFields} />
          </div>
          <div className="rounded-md border border-black/10 p-7 space-y-5 shadow-sm bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-rose-100 rounded-full text-rose-800 h-10 w-10 flex justify-center items-center font-bold">
                5
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
                6
              </div>
              <h1 className="text-lg font-semibold ">Product Image</h1>
            </div>
            <hr />
            <FormRenderer
              control={methods.control}
              fields={productImageConfig()}
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
              fields={productGalleryConfig()}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => methods.reset()}
              className="shadow-none text-black px-4 py-2 border !border-black/20 bg-transparent rounded-md hover:text-white"
            >
              Cancel
            </Button>

            <Button type="submit" className="rounded-md">
              Save Product
            </Button>
          </div>
        </form>
      </FormProvider>
    </AdminLayout>
  );
};

export default AddProduct;
