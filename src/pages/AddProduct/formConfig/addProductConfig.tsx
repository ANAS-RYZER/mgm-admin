type Option = {
  label: string;
  value: string;
};

export type ProductFormValues = {
  sku: string;
  name: string;
  description?: string;

  category: string;
  status?: string;

  mrpPrice: number | "";
  discountedPrice?: number | "";

  stockQuantity: number | "";

  image?: string;
  gallery?: string[];

  goldSpecs: {
    karat: string;
    metal: string;
    goldWeight: number | "";
    grossWeight: number | "";
    makingCharges?: number | "";
    purity?: string;
  };
  stoneSpecs?: any[];
};

export type FieldConfig = {
  name: string;
  type:
    | "text"
    | "number"
    | "select"
    | "textarea"
    | "image-upload"
    | "multiple-image-upload"
    | "repeatable-group";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
  defaultValue?: any;
  colSpan?: string;
  meta?: any;

  // 👇 NEW
  fields?: FieldConfig[]; // children for arrays
};

export const CATEGORY_OPTIONS = [
  { label: "Rings", value: "rings" },
  { label: "Necklaces", value: "necklaces" },
  { label: "Earrings", value: "earrings" },
  { label: "Bangles", value: "bangles" },
  { label: "Pendants", value: "pendants" },
  { label: "Bracelets", value: "bracelets" },
  { label: "Mangalsutras", value: "mangalsutras" },
  { label: "Chains", value: "chains" },
];
export const STATUS_OPTIONS = [
  { label: "New Launch", value: "new-launch" },
  { label: "Ready To Ship", value: "ready-to-ship" },
  { label: "In Production", value: "in-production" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Out of Stock", value: "out-of-stock" },
  { label: "Best Seller", value: "best-seller" },
  { label: "Limited Edition", value: "limited-edition" },
  { label: "Discontinued", value: "discontinued" },
];

export const productBasicInfoConfig = (): FieldConfig[] => {
  return [
    {
      name: "name",
      type: "text",
      label: "Product Name",
      placeholder: "Enter product name",
      required: true,
    },
    {
      name: "categories",
      type: "select",
      label: "Category",
      // defaultValue: "rings",
      placeholder: "Select category",
      options: CATEGORY_OPTIONS,
      required: true,
    },

    {
      name: "sku",
      type: "text",
      label: "SKU",
      placeholder: "Enter SKU",
      required: true,
    },

    {
      name: "material",
      type: "text",
      label: "Material",
      placeholder: "Enter material",
      required: true,
    },
    {
      name: "dimensions",
      type: "text",
      label: "Dimensions",
      placeholder: "Enter dimensions",
      required: true,
    },
  ];
};

export const prodcutDescInfoConfig = (): FieldConfig[] => {
  return [
    {
      name: "description",
      type: "textarea",
      label: "Product Description",
      placeholder: "Enter product description",
      required: true,
      colSpan: "col-span-3",
    },
  ];
};

export const prodcutPricingAndInventoryConfig = (): FieldConfig[] => {
  return [
    {
      name: "mrpPrice",
      type: "number",
      label: "MRP Price",
      placeholder: "₹ 0.00",
      required: true,
    },
    {
      name: "discountedPrice",
      type: "number",
      label: "Discounted Price",
      placeholder: "₹ 0.00",
    },
    {
      name: "stockQuantity",
      type: "number",
      label: "Stock Quantity",
      placeholder: "0",
      required: true,
    },
  ];
};
export const prodcutGoldSpecConfig = (): FieldConfig[] => [
  {
    name: "goldSpecs.karat",
    type: "text",
    label: "Karat",
    placeholder: "e.g., 18K",
    required: true,
  },
  {
    name: "goldSpecs.metal",
    type: "text",
    label: "Metal",
    placeholder: "Gold",
    required: true,
  },
  {
    name: "goldSpecs.goldWeight",
    type: "number",
    label: "Gold Weight (g)",
    required: true,
  },
  {
    name: "goldSpecs.grossWeight",
    type: "number",
    label: "Gross Weight (g)",
    required: true,
  },
  {
    name: "goldSpecs.makingCharges",
    type: "number",
    label: "Making Charges (₹)",
  },
  {
    name: "goldSpecs.purity",
    type: "text",
    label: "Purity",
    placeholder: "916 Hallmark",
  },
];

export const productImageConfig = (): FieldConfig[] => [
  {
    name: "image",
    type: "image-upload",
    label: "Main Product Image",
    required: true,
    meta: {
      belongsTo: "product",
      isPublic: true,
      dimensions: "1200 × 1200",
    },
    colSpan: "col-span-3",
  },
];

export const productGalleryConfig = (): FieldConfig[] => [
  {
    name: "gallery",
    type: "multiple-image-upload",
    label: "Product Gallery",
    required: false,
    meta: {
      belongsTo: "product",
      isPublic: true,
    },
    colSpan: "col-span-3",
  },
];

export const productStoneSpecsConfig = (): FieldConfig[] => [
  {
    name: "stoneSpecs",
    type: "repeatable-group",
    label: "Stone Specifications",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Stone Name",
        placeholder: "Diamond",
      },
      {
        name: "weight",
        type: "number",
        label: "Weight (ct)",
        placeholder: "0.00",
      },
      {
        name: "color",
        type: "text",
        label: "Color",
        placeholder: "D",
      },
      {
        name: "clarity",
        type: "text",
        label: "Clarity",
        placeholder: "VVS1",
      },
    ],
  },
];
