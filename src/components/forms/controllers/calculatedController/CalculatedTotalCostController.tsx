import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CalculatedTotalCostController({ control, fieldConfig }: any) {
  const { name, label } = fieldConfig;
  const { watch, setValue } = useFormContext();

  const goldPrice = watch("goldSpecs.goldPrice");
  const stoneSpecs = watch("stoneSpecs") ?? [];

  const metalTotal = Number(goldPrice) || 0;
  const stonesTotal = (Array.isArray(stoneSpecs) ? stoneSpecs : []).reduce(
    (sum, item) => sum + (Number(item?.price) || 0),
    0
  );
  const total = metalTotal + stonesTotal;

  useEffect(() => {
    setValue(name, total > 0 ? total : "", { shouldValidate: false });
  }, [name, total, setValue]);

  const hasMetal = metalTotal > 0;
  const hasStones = stonesTotal > 0;
  const breakdown =
    hasMetal || hasStones
      ? [
          hasMetal && `Metal: ₹${metalTotal.toLocaleString("en-IN")}`,
          hasStones && `Stones: ₹${stonesTotal.toLocaleString("en-IN")}`,
        ]
          .filter(Boolean)
          .join("  ·  ")
      : "";
  const displayValue =
    total > 0
      ? `₹ ${total.toLocaleString("en-IN")}`
      : "—";
  const subtitle = total > 0 && breakdown ? breakdown : null;

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="col-span-1 md:col-span-2 xl:col-span-3">
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>
            <div className="space-y-1">
              <Input
                type="text"
                readOnly
                value={displayValue}
                className="bg-gray-100 border border-black/10 text-black font-medium shadow-none rounded-lg cursor-not-allowed text-base"
              />
              {subtitle && (
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
