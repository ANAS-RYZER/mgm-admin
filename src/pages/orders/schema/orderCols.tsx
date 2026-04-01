import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const formatCurrency = (value?: number) => {
  if (!value && value !== 0) return "-";
  return `₹${value.toLocaleString("en-IN")}`;
};

export const orderListCols = (): ColumnDef<any>[] => {
  const navigate = useNavigate();

  return [
    // 🆔 Order ID
    {
      header: "Order ID",
      accessorKey: "_id",
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original._id || "-"}</span>
      ),
    },

    // 📅 Date
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <span className="font-medium">
          {format(row.original.createdAt, "dd MMM yyyy, hh:mm a") || "-"}
        </span>
      ),
    },

    // 👤 Customer
    {
      header: "Customer",
      accessorKey: "user",
      cell: ({ row }) => {
        const user = row.original.user;
        return (
          <div className="leading-tight">
            <p className="font-medium">
              {user?.fullName || user?.username || "-"}
            </p>
          </div>
        );
      },
    },

    // 🤝 Partner / Agent
    {
      header: "Partner",
      accessorKey: "partner",
      cell: ({ row }) => {
        const agent = row.original.partner;
        return (
          <div className="leading-tight">
            <p className="font-medium">{agent?.name || "-"}</p>
            <p className="text-xs text-muted-foreground">
              ID: {agent?.agentId || "-"}
            </p>
          </div>
        );
      },
    },

    {
      header: "Products",
      accessorKey: "products",
      cell: ({ row }) => {
        const products = row.original.products || [];

        if (!products.length) return "-";

        const first = products[0]?.name || "Unknown";
        const remaining = products.length - 1;

        return (
          <span className="truncate max-w-[180px] inline-block">
            {first}
            {remaining > 0 && ` +${remaining}`}
          </span>
        );
      },
    },

    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className="font-medium">
          {formatCurrency(row.original.amount)}
        </span>
      ),
    },

    {
      header: "Commission",
      accessorKey: "partnerCommission",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatCurrency(row.original.partnerCommission)}
        </span>
      ),
    },

    // // 🟢 Status (keep it future-proof)
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   cell: ({ row }) => <StatusBadge status={row.original.status} />,
    // },

    // ⚡ Actions
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/orders/${row.original._id}`)}
            className="hover:bg-primary/10"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
};
