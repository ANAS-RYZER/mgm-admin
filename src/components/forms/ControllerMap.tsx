import { CalculatedStonePriceController } from "./controllers/calculatedController/CalculatedStonePriceController";
import { ImageUploadController } from "./controllers/image/ImageUploadController";
import { InputController } from "./controllers/inputController/InputController";
import MultiImageUploadController from "./controllers/multiImageController/MultiImageUploadController";
import { RepeatableGroupController } from "./controllers/repetableController/RepeatableGroupController";
import { SelectController } from "./controllers/selectController/SelectController";
import { TextareaController } from "./controllers/textArea/TextAreaController";

export function ControllerMap({ control, fieldConfig }: any) {
  switch (fieldConfig.type) {
    case "text":
      
    case "number":
      return <InputController control={control} fieldConfig={fieldConfig} />;

    case "select":
      return <SelectController control={control} fieldConfig={fieldConfig} />;

    case "textarea":
      return <TextareaController control={control} fieldConfig={fieldConfig} />;
    case "image-upload":
      return <ImageUploadController fieldConfig={fieldConfig} />;

    case "multiple-image-upload":
      return <MultiImageUploadController fieldConfig={fieldConfig} />;
    case "repeatable-group":
      return <RepeatableGroupController fieldConfig={fieldConfig} />;

    case "calculated-stone-price":
      return <CalculatedStonePriceController control={control} fieldConfig={fieldConfig} />;

    default:
      return null;
  }
}
