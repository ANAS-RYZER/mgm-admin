import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { ControllerMap } from "../ControllerMap";

export function RepeatableGroupController({ fieldConfig }: any) {
  const { name, label, fields = [] } = fieldConfig;

  const { control } = useFormContext();

  const { fields: rows, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4 col-span-3">
     

      {rows.map((row, index) => (
        <div key={row.id} className="border rounded-md p-4 space-y-3">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {fields.map((childField:any) => (
              <ControllerMap
                key={`${name}.${index}.${childField.name}`}
                control={control}
                fieldConfig={{
                  ...childField,
                  name: `${name}.${index}.${childField.name}`,
                }}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => remove(index)}
              className="text-red-500"
            >
              <Trash className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => append({})}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add {label}
      </Button>
    </div>
  );
}
