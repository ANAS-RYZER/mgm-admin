import { ControllerMap } from "./ControllerMap";
import { InputController } from "./controllers/inputController/InputController";
import { SelectController } from "./controllers/selectController/SelectController";
import { TextareaController } from "./controllers/textArea/TextAreaController";

export function FormRenderer({ control, fields }: any) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {fields.map((fieldConfig: any) => (
        <ControllerMap
          key={fieldConfig.name}
          control={control}
          fieldConfig={fieldConfig}
        />
      ))}
    </div>
  );
}
