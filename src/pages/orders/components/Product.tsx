import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/global";

const Product = ({
  name,
  url,
  qty,
  price,
  sku,
}: {
  name: string;
  url: string;
  qty: number;
  price: number;
  sku: string;
}) => {
  return (
    <div className="flex items-center gap-6 w-full">

      {/* 🔹 Image */}
      <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg border">
        <img
          src={url}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔹 Info (takes remaining space) */}
      <div className="flex-1 min-w-0">
        <h1 className="font-medium truncate">{name}</h1>

        <div className="flex items-center gap-3 mt-1">
          <Badge className="shrink-0">{sku}</Badge>

          {/* <p className="text-sm whitespace-nowrap">
            Qty: <span>{qty}</span>
          </p> */}
        </div>
      </div>

      {/* 🔹 Price (fixed width, right aligned) */}
      <div className="w-32 text-right flex-shrink-0">
        <h1 className="font-semibold">{formatINR(price)}</h1>
        <p className="text-xs text-muted-foreground italic mr-2">Market Value</p>
      </div>

    </div>
  );
};
export default Product;