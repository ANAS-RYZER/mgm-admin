import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

export function InputController({ control, fieldConfig }: any) {
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem className={clsx(fieldConfig.colSpan ?? "col-span-1")}>
          <FormLabel className="text-black">
            {fieldConfig.label}{" "}
            {fieldConfig.required && <span className="text-red-600">*</span>}
          </FormLabel>

          <FormControl>
            <Input
              {...field}
              type={"text"}
              placeholder={fieldConfig.placeholder}
              onChange={(e) => {
                const raw = e.target.value;

                const value =
                  fieldConfig.type === "number"
                    ? raw === ""
                      ? ""
                      : isNaN(Number(raw))
                        ? field.value 
                        : Number(raw)
                    : raw;

                field.onChange(value);
              }}
              className="!bg-gray-100 border border-black/10 text-black !shadow-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-0 rounded-md"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
