import { ImageUploadController } from "./controllers/ImageUploadController";
import { InputController } from "./controllers/InputController";
import MultiImageUploadController from "./controllers/MultiImageUploadController";
import { RepeatableGroupController } from "./controllers/RepeatableGroupController";
import { SelectController } from "./controllers/SelectController";
import { TextareaController } from "./controllers/TextAreaController";

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

    default:
      return null;
  }
}
