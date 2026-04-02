import { FieldConfig } from "@/lib/FiledConfig";
import { selectRowsFn } from "@tanstack/react-table";


export type ProductFormValues = {
  name: string;
  material: string;
  categories: string;
  description?: string;

  status?: string;

  calculatedTotalCost?: number | "";
  mrpPrice: number | "";
  discountedPrice?: number | "";
  discountedPercentage?: number | "";
  netprice?: number | "";

  // New pricing fields
  grossPrice?: number | "";
  cgst?: number | "";
  sgst?: number | "";
  va?: number | "";
  multiplestonePrice?: number | "";

  stockQuantity: number | "";

  image?: string;
  gallery?: string[];

  goldSpecs: {
    karat: string;
    metal: string;
    goldWeight: number | "";
    netWeight: number | "";
  };
  makingChanges?: number | "";
  netWeight?: number | ""; // Top level to fix 400 error
  goldPrice?: number | ""; // Top level to fix 400 error
  stoneSpecs?: any[];
};



export const categories_OPTIONS = [
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
      placeholder: "Select category",
      options: categories_OPTIONS,
      required: true,
    },



    {
      name: "material",
      type: "text",
      label: "Material",
      placeholder: "Enter material",
      required: true,
    },
    // {
    //   name: "dimensions",
    //   type: "text",
    //   label: "Dimensions",
    //   placeholder: "Enter dimensions",
    //   required: true,
    // },
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
      name: "grossPrice",
      type: "calculated-total-cost",
      label: "Gross Price",
      placeholder: "₹ 0.00",
    },
    {
      name: "va",
      type: "number",
      label: "VA (Value Added) Amount",
      placeholder: "0",
    },
    {
      name: "multiplestonePrice",
      type: "calculated-stone-total",
      label: "Multiple Stone Price",
      placeholder: "₹ 0.00",
    },
    {
      name: "makingChanges",
      type: "number",
      label: "Making Charges (₹)",
      placeholder: "0",
    },
    {
      name: "cgst",
      type: "number",
      label: "CGST (%)",
      placeholder: "1.5",
    },
    {
      name: "sgst",
      type: "number",
      label: "SGST (%)",
      placeholder: "1.5",
    },
    {
      name: "mrpPrice",
      type: "calculated-mrp-price", // We will create this or update CalculatedTotalCost
      label: "MRP Price (EXCLUDES Tax)",
      placeholder: "₹ 0.00",
    },
    {
      name: "discountedPercentage",
      type: "number",
      label: "Discount %",
      placeholder: "0",
    },
    {
      name: "discountedPrice",
      type: "calculated-net-price", // This currently calculates based on discountedPrice as percent, I'll update it
      label: "Final Price",
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
export const PLATINUM_PURITY_OPTIONS = [
  { label: "99%", value: "99%" },
  { label: "90%", value: "90%" },
  { label: "95%", value: "95%" },
  { label: "85%", value: "85%" },
];

export const prodcutGoldSpecConfig = (metal: string = ""): FieldConfig[] => {
  const isPlatinum = metal === "platinum";

  return [
    {
      name: "goldSpecs.metal",
      type: "select",
      label: "Metal",
      placeholder: "Select metal",
      required: true,
      options: [
        { label: "Gold", value: "gold" },
        { label: "Platinum", value: "platinum" },
      ],
    },
    // Karat for Gold only
    ...(isPlatinum
      ? []
      : [
        {
          name: "goldSpecs.karat",
          type: "select" as const,
          label: "Karat",
          placeholder: "Select karat",
          required: true,
          options: [
            { label: "24K", value: "24K" },
            { label: "22K", value: "22K" },
            { label: "18K", value: "18K" },
            { label: "14K", value: "14K" },
          ],
        },
        {
          name: "goldSpecs.goldWeight", // Moved back into goldSpecs
          type: "number" as const,
          label: "Gold Weight (g)",
          required: true,
        },
      ]),
    // Purity for Platinum only
    ...(isPlatinum
      ? [
        {
          name: "goldSpecs.purity",
          type: "select" as const,
          label: "Purity",
          placeholder: "Select purity",
          required: true,
          options: PLATINUM_PURITY_OPTIONS,
        },
      ]
      : []),


    {
      name: "goldSpecs.netWeight",
      type: "number" as const,
      label: "Net Weight (g)",
      required: true,
    },
    {
      name: "goldPrice", // Moved to top level
      type: "fetched-metal-price" as const,
      label: "Metal value (weight × per g price)",
    },
  ];
};

export const productImageConfig = (refId: string): FieldConfig[] => [
  {
    name: "image",
    type: "image-upload",
    label: "Main Product Image",
    required: true,
    meta: {
      belongsTo: "product",
      isPublic: true,
      dimensions: "1200 × 1200",
      refId: refId || "",
    },
    colSpan: "col-span-3",
  },
];

export const productGalleryConfig = (refId: string): FieldConfig[] => [
  {
    name: "gallery",
    type: "multiple-image-upload",
    label: "Product Gallery",
    required: false,
    meta: {
      belongsTo: "product",
      isPublic: true,
      dimensions: "1200 × 1200",
      refId: refId || "",
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
        name: "stoneName",
        type: "text",
        label: "Stone Name",
        placeholder: "Diamond",
      },
      {
        name: "quantity",
        type: "number",
        label: "Weight (ct)",
        placeholder: "0.00",
      },
      {
        name: "cut",
        type: "select",
        label: "Cut",
        placeholder: "Cut",
        options: [
          { label: "Round", value: "round" },
        ],
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
      {
        name: "diamondType",
        type: "select",
        label: " Diamond Type",
        options: [
          { label: "Lab Grown", value: "lab-grown" },
          { label: "Natural", value: "Natural" }

        ]

      },
      {
        name: "stoneprice",
        type: "calculated-stone-price",
        label: "Price (₹)",
      },
    ],
  },
];


export const commisionConfig = (): FieldConfig[] => {
  return [
    {
      name: "commissionPercentage",
      type: "number",
      label: "Commision (%)",
      placeholder: "0",
    },
  ]
};