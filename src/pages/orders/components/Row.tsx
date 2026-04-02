import { formatINR } from "@/lib/global";
import clsx from "clsx";

const Row = ({
  label,
  value,
  bold,
  isNegative,
}: {
  label: string;
  value: number;
  bold?: boolean;
  isNegative?: boolean;
}) => {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>

      <span
        className={clsx(
          bold ? "font-semibold text-base" : "",
          isNegative ? "text-red-500" : "",
          ""
        )}
      >
        {formatINR(value)}
      </span>
    </div>
  );
};
export default Row;
