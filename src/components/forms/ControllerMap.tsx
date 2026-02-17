import { CalculatedStoneTotalController } from "./controllers/calculatedController/CalculatedStoneTotalController";
import { CalculatedMrpPriceController } from "./controllers/calculatedController/CalculatedMrpPriceController";
import { CalculatedStonePriceController } from "./controllers/calculatedController/CalculatedStonePriceController";
import { CalculatedNetPriceController } from "./controllers/calculatedController/CalculatedNetPriceController";
import { CalculatedTotalCostController } from "./controllers/calculatedController/CalculatedTotalCostController";
import { FetchedMetalPriceController } from "./controllers/calculatedController/FetchedMetalPriceController";
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

    case "fetched-metal-price":
      return <FetchedMetalPriceController control={control} fieldConfig={fieldConfig} />;

    case "calculated-total-cost":
      return <CalculatedTotalCostController control={control} fieldConfig={fieldConfig} />;

    case "calculated-net-price":
      return <CalculatedNetPriceController control={control} fieldConfig={fieldConfig} />;

    case "calculated-mrp-price":
      return <CalculatedMrpPriceController control={control} fieldConfig={fieldConfig} />;

    case "calculated-stone-total":
      return <CalculatedStoneTotalController control={control} fieldConfig={fieldConfig} />;

    default:
      return null;
  }
}
