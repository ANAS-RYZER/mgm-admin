import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export const applicationListCols = () => {
  const navigate = useNavigate();
  return [
    {
      header: "Application ID",
      accessorKey: "applicationId",
      cell: ({ row }: { row: any }) => {
        const agentId = row.original.applicationId;
        return <span className="font-mono text-xs">{agentId || "-"}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }: { row: any }) => {
        return <span className="font-medium">{row.original.name || "-"}</span>;
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }: { row: any }) => {
        return <span>{row.original.email || "-"}</span>;
      },
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      cell: ({ row }: { row: any }) => {
        return (
          <span className="capitalize">{row.original.phoneNumber || "-"}</span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => {
        const status = row.original.status;
        return <StatusBadge status={status} />;
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
                navigate(`/applications/${row.original._id}`);
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
