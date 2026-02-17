import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CalculatedNetPriceController({ control, fieldConfig }: any) {
  const { name, label } = fieldConfig;
  const { watch, setValue } = useFormContext();

  const mrpPrice = watch("mrpPrice");
  const discountedPercentage = watch("discountedPercentage");

  const mrp = Number(mrpPrice) || 0;
  const discount = Number(discountedPercentage) || 0;
  const net = mrp > 0 ? mrp * (1 - discount / 100) : 0;

  useEffect(() => {
    setValue(name, net > 0 ? Math.round(net) : "", { shouldValidate: false });
  }, [name, net, setValue]);

  const displayValue =
    net > 0 ? `₹ ${Math.round(net).toLocaleString("en-IN")}` : "—";

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              readOnly
              value={displayValue}
              className="bg-gray-100 border border-black/10 text-black font-medium shadow-none rounded-lg cursor-not-allowed"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
