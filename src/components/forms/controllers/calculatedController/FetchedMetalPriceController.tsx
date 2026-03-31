import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useGetPrices from "@/hooks/prices/useGetPrices";

function getPriceFromSpec(
  metal: string,
  karat: string,
  purity: string,
  gold: { name: string; price: number }[],
  platinum: { name: string; price: number }[]
): number {
  if (metal === "gold" && karat) {
    const item = gold.find((p) => p.name === karat);
    return item?.price ?? 0;
  }
  if (metal === "platinum" && purity) {
    const item = platinum.find((p) => p.name === purity);
    return item?.price ?? 0;
  }
  return 0;
}

export function FetchedMetalPriceController({ control, fieldConfig }: any) {
  const { name, label } = fieldConfig;
  const { watch, setValue } = useFormContext();
  const { data, isLoading } = useGetPrices();

  const metal = watch("goldSpecs.metal");
  const karat = watch("goldSpecs.karat");
  const purity = watch("goldSpecs.purity");
  const goldWeight = watch("goldSpecs.goldWeight");

  const gold = data?.gold ?? [];
  const platinum = data?.platinum ?? [];
  const perGramPrice = getPriceFromSpec(metal, karat, purity, gold, platinum);
  const weightNum = Number(goldWeight);
  const hasWeight = !Number.isNaN(weightNum) && weightNum > 0;
  const total = hasWeight && perGramPrice > 0 ? weightNum * perGramPrice : 0;

  useEffect(() => {
    setValue(name, total > 0 ? total : "", { shouldValidate: false });
  }, [name, total, setValue]);

  const displayValue =
    isLoading || !metal
      ? "—"
      : perGramPrice > 0 && hasWeight
        ? `${weightNum}g × ₹${perGramPrice.toLocaleString("en-IN")}/g = ₹${total.toLocaleString("en-IN")}`
        : perGramPrice > 0
          ? `₹${perGramPrice.toLocaleString("en-IN")}/g — enter weight`
          : "Select metal & karat/purity";

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
              value={displayValue}
              className="bg-gray-100 border border-black/10 text-black font-medium shadow-none rounded-lg cursor-not-allowed"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
