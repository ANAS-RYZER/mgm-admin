import StatusBadge from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig } from "@/pages/appointments/lib/Status";
import clsx from "clsx";

export const recentAppointmentCols = () => {
  return [
    {
      header: "User",
      accessorKey: "userName",
      cell: ({ row }: { row: any }) => {
        return (
          <div className="flex flex-col">
            <p>{row.original.userName || "-"}</p>
            <p className="text-xs">{row.original.email || "-"}</p>
          </div>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: { row: any }) => {
        return <span>{row.original.date || "-"}</span>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const config = getStatusConfig(row.original.status);

        return (
          <Badge
            className={clsx(
              config.bgColor,
              config.borderColor,
              "text-white rounded-md",
            )}
          >
            {config.text}
          </Badge>
        );
      },
    },
  ];
};
