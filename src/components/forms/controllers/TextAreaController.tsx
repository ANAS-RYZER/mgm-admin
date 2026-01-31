import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import clsx from "clsx";

export function TextareaController({ control, fieldConfig }: any) {
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      rules={{
        required: fieldConfig.required
          ? `${fieldConfig.label} is required`
          : false,
      }}
      render={({ field }) => (
        <FormItem
          className={clsx(
            fieldConfig.colSpan
              ? `${fieldConfig.colSpan}`
              : "col-span-1",
          )}
        >
          <FormLabel className="text-black">
            {fieldConfig.label}
            {fieldConfig.required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </FormLabel>

          <FormControl>
            <Textarea
              {...field}
              placeholder={fieldConfig.placeholder}
              rows={4}
              className="bg-gray-100 border border-black/10 font-medium shadow-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-0"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
