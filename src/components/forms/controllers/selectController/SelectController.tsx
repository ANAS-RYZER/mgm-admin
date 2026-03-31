import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SelectController({ control, fieldConfig }: any) {
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
        <FormItem>
          <FormLabel className="text-black">
            {fieldConfig.label}{" "}
            {fieldConfig.required && <span className="text-red-600">*</span>}
          </FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-11 rounded-lg bg-gray-100 border border-black/10 font-medium shadow-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-0">
                <SelectValue
                  placeholder={fieldConfig.placeholder ?? "Select"}
                />
              </SelectTrigger>

              <SelectContent>
                {fieldConfig.options?.map((opt: any) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
