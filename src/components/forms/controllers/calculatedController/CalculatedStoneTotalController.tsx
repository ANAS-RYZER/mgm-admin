import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CalculatedStoneTotalController({ control, fieldConfig }: any) {
    const { name, label } = fieldConfig;
    const { watch, setValue } = useFormContext();

    const stoneSpecs = watch("stoneSpecs") ?? [];

    const stonesTotal = (Array.isArray(stoneSpecs) ? stoneSpecs : []).reduce(
        (sum, item) => sum + (Number(item?.stoneprice) || 0),
        0
    );

    useEffect(() => {
        setValue(name, stonesTotal > 0 ? stonesTotal : "", { shouldValidate: false });
    }, [name, stonesTotal, setValue]);

    const displayValue =
        stonesTotal > 0
            ? `₹ ${stonesTotal.toLocaleString("en-IN")}`
            : "—";

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
