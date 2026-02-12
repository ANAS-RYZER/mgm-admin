
type Option = {
    label: string;
    value: string;
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
      | "repeatable-group"
      | "calculated-stone-price"
      | "fetched-metal-price"
      | "calculated-total-cost"
      | "calculated-net-price";

    multiple?: boolean;
    disabled?: boolean;
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