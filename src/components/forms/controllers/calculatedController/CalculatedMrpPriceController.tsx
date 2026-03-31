import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function CalculatedMrpPriceController({ control, fieldConfig }: any) {
    const { name, label } = fieldConfig;
    const { watch, setValue } = useFormContext();

    const grossPrice = watch("grossPrice");

    const mrp = Number(grossPrice) || 0;

    useEffect(() => {
        setValue(name, mrp > 0 ? Math.round(mrp) : "", {
            shouldValidate: false,
            shouldDirty: false,
        });
    }, [mrp, name, setValue]);

    const displayValue =
        mrp > 0
            ? `₹ ${Math.round(mrp).toLocaleString("en-IN")}`
            : "—";

    return (
        <FormField
            control={control}
            name={name}
            render={() => (
                <FormItem className="col-span-1 md:col-span-2 xl:col-span-3">
                    <FormLabel className="text-black">{label}</FormLabel>

                    <FormControl>
                        <Input
                            type="text"
                            readOnly
                            value={displayValue}
                            className="bg-gray-100 border border-black/10 text-black font-medium shadow-none rounded-lg cursor-not-allowed text-base"
                        />
                    </FormControl>

                    <p className="text-xs text-muted-foreground">
                        MRP (Base Price + VA + Making Charges)
                    </p>
                </FormItem>
            )}
        />
    );
}
