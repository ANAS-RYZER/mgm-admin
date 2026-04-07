import StatusBadge from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { handleCopyToClipboard } from "@/lib/global";
import { getStatusConfig } from "@/pages/appointments/lib/Status";
import { formatCurrency } from "@/pages/orders/schema/orderCols";
import clsx from "clsx";
import { format } from "date-fns";
import { Copy } from "lucide-react";

export const recentOrderCols = () => {
  return [
    {
      header: "Order ID",
      accessorKey: "orderId",
      cell: ({ row }: { row: any }) => {
        return (
          <div className="font-mono relative pl-4">
              <Copy
                onClick={() =>
                  handleCopyToClipboard(row.original.orderId || "-", "Order ID")
                }
                size={12}
                className="cursor-pointer absolute left-0 top-0.5"
              />
           <p >{row.original.orderId || "-"}</p>
          </div>
        );
      },
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }: { row: any }) => {
        return (
          <span className="font-medium">
            {formatCurrency(row.original.amount) || "0.00"}
          </span>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: { row: any }) => {
        return <span>{format(row.original.date, "yyyy-MM-dd") || "-"}</span>;
      },
    },
  ];
};
