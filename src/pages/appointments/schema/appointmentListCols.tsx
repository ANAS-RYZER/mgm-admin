import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { ColumnDef } from "@tanstack/react-table";

export const appointmentListCols = (): ColumnDef<any, any>[] => {
  const navigate = useNavigate();
  return [
    {
      header: "Appointment ID",
      accessorKey: "_id",
      cell: ({ row }: { row: any }) => {
        console.log("Row", row.original);
        const appointmentId = row.original._id;
        return (
          <span className="font-mono text-xs">{appointmentId || "-"}</span>
        );
      },
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: { row: any }) => {
        return <span className="font-medium">{row.original.date || "-"}</span>;
      },
    },
    {
      header: "Slot",
      accessorKey: "slot",
      meta: {
        align: "center",
      },
      cell: ({ row }: { row: any }) => {
        return (
          <div className="">
            <h1 className=" font-semibold">{row.original.slotCode || "-"}</h1>
            <p className="">
              {`${row.original.slotStartTime}` +
                " - " +
                ` ${row.original.slotEndTime}` || "-"}
            </p>
          </div>
        );
      },
    },
    {
      header: "User",
      accessorKey: "user",
      cell: ({ row }: { row: any }) => {
        const user = row.original.user;
        return (
          <div className="">
            <h1>{user?.fullName || "-"}</h1>
            <p className="text-xs mt-2">{user?.email || "-"}</p>
          </div>
        );
      },
    },
    {
      header: "Partner",
      accessorKey: "partner",
      cell: ({ row }: { row: any }) => {
        const agent = row.original.partner;
        return (
          <div className="">
            <h1>{agent?.name || "-"}</h1>
            <p className="text-xs mt-2">{agent?.email || "-"}</p>
            <p className="text-xs">Partner ID: {agent?.agentId || "-"}</p>
          </div>
        );
      },
    },
    // {
    //   header: "Partner",
    //   accessorKey: "user",
    //   cell: ({ row }: { row: any }) => {
    //     return <span className="capitalize">{row.original.user || "-"}</span>;
    //   },
    // },
    {
      header: "Products",
      accessorKey: "productIds",
      cell: ({ row }: { row: any }) => {
        return (
          <span className="capitalize ml-2">
            {row.original.productIds.length || "-"}
          </span>
        );
      },
    },

    {
      header: "Actions",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Handle view action
                navigate(`/appointments/${row.original._id}`);
              }}
              className="h-8 w-8 p-0 hover:bg-primary/10"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
};
