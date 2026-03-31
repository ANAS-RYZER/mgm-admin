import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/** Per-carat rates: Natural ₹75,000, Lab Grown ₹15,000 */
const RATES: Record<string, number> = {
  Natural: 75000,
  "lab-grown": 15000,
};

function getParentPath(fieldName: string): string {
  const parts = fieldName.split(".");
  parts.pop();
  return parts.join(".");
}

function calculatePrice(quantity: number | string, diamondType: string): number {
  const qty = typeof quantity === "number" ? quantity : Number(quantity) || 0;
  const rate = RATES[diamondType] ?? 0;
  return qty * rate;
}

export function CalculatedStonePriceController({ control, fieldConfig }: any) {
  const { name, label } = fieldConfig;
  const { watch, setValue } = useFormContext();
  const parentPath = getParentPath(name);
  const quantity = watch(`${parentPath}.quantity`);
  const diamondType = watch(`${parentPath}.diamondType`);

  const calculatedPrice = calculatePrice(quantity, diamondType);

  useEffect(() => {
    setValue(name, calculatedPrice, { shouldValidate: false });
  }, [name, calculatedPrice, setValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="col-span-1">
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              readOnly
              value={calculatedPrice > 0 ? `₹ ${calculatedPrice.toLocaleString("en-IN")}` : "₹ 0"}
              className="bg-gray-100 border border-black/10 text-black font-medium shadow-none rounded-lg cursor-not-allowed"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
