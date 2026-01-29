export type FieldType = "text" | "number" | "select" | "textarea";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];   // only for select
  colSpan?: number;
  rows?: number;        // for textarea
}

export interface FormConfig {
  title: string;
  subtitle: string;
  fields: FormField[];
  actions: {
    cancel: string;
    submit: string;
  };
}

export const addProductFormConfig: FormConfig = {
  title: "Add New Product",
  subtitle: "Craft a new catalogue highlight",

  fields: [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      placeholder: "Enter product name",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: ["Bridal", "Luxury", "Everyday", "Limited"],
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Enter SKU",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "₹0.00",
    },
    {
      name: "stock",
      label: "Stock Quantity",
      type: "number",
      placeholder: "0",
    },
    {
      name: "weight",
      label: "Weight",
      type: "text",
      placeholder: "e.g. 12g",
    },
    {
      name: "material",
      label: "Material",
      type: "text",
      placeholder: "Gold, Platinum...",
    },
    {
      name: "dimensions",
      label: "Dimensions",
      type: "text",
      placeholder: "10 x 8 mm",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder:
        "Describe craftsmanship, gem palette, and signature finish",
      rows: 4,
    },
  ],

  actions: {
    cancel: "Cancel",
    submit: "Save Product",
  },
};
