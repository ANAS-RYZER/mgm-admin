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
    const cgst = watch("cgst") || 0;
    const sgst = watch("sgst") || 0;

    const gross = Number(grossPrice) || 0;
    const cgstVal = Number(cgst) || 0;
    const sgstVal = Number(sgst) || 0;

    const taxAmount = gross * ((cgstVal + sgstVal) / 100);
    const mrp = gross + taxAmount;

    useEffect(() => {
        setValue(name, mrp > 0 ? Math.round(mrp) : "", { shouldValidate: false });
    }, [name, mrp, setValue]);

    const displayValue =
        mrp > 0 ? `₹ ${Math.round(mrp).toLocaleString("en-IN")}` : "—";

    const breakdown = mrp > 0 ? `Tax: ₹${Math.round(taxAmount).toLocaleString("en-IN")} (${cgstVal + sgstVal}%)` : null;

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
                            {breakdown && (
                                <p className="text-xs text-muted-foreground">{breakdown}</p>
                            )}
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
