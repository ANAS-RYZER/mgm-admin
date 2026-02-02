import { FieldConfig } from "@/lib/FiledConfig";


export type ProductFormValues = {
  sku: string;
  name: string;
  categories: string;
  description?: string;

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
    name: "goldSpecs.makingCharges",
    type: "number",
    label: "Making Charges (%)",
  },
  // {
  //   name: "goldSpecs.purity",
  //   type: "text",
  //   label: "Purity",
  //   placeholder: "916 Hallmark",
  // },
];

export const productImageConfig = (sku: string): FieldConfig[] => [
  {
    name: "image",
    type: "image-upload",
    label: "Main Product Image",
    required: true,
    meta: {
      belongsTo: "product",
      isPublic: true,
      dimensions: "1200 × 1200",
      refId: sku || ""  ,
    },
    colSpan: "col-span-3",
  },
];

export const productGalleryConfig = (sku: string): FieldConfig[] => [
  {
    name: "gallery",
    type: "multiple-image-upload",
    label: "Product Gallery",
    required: false,
    meta: {
      belongsTo: "product",
      isPublic: true,
      dimensions: "1200 × 1200",
      refId: sku || "",
    },
    colSpan: "col-span-3",
  },
];

export const productStoneSpecsConfig = (): FieldConfig[] => [
  // export class StoneDetailsDto {
  //   @IsNotEmpty()
  //   stoneName: string;
  
  //   @IsNumber()
  //   quantity: number;
  
  //   @IsEnum(GemCut)
  //   cut: GemCut;
  
  //   @IsOptional()
  //   @IsEnum(DiamondClarity)
  //   clarity?: DiamondClarity;
  
  //   @ValidateNested()
  //   @Type(() => ColorDto)
  //   color: ColorDto;
  // }
  
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
        name: "stoneSpecs.price",
        type: "text",
        label: "Price (₹)",
        placeholder: "0.00",
      },
    ],
  },
];
