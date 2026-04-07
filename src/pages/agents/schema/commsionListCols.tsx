import StatusBadge from "@/components/common/StatusBadge";

export const commissionListCols = () => {
  return [
    {
      header: "Order ID",
      accessorKey: "orderId",
      cell: ({ row }: { row: any }) => {
        return (
          <span className="font-mono text-xs">
            {row.original.orderId || "-"}
          </span>
        );
      },
    },
    {
      header: "Referral Code",
      accessorKey: "referralCode",
      cell: ({ row }: { row: any }) => {
        return <span>{row.original.referralCode || "-"}</span>;
      },
    },
    {
      header: "Order Value (₹)",
      accessorKey: "totalOrderAmount",
      cell: ({ row }: { row: any }) => {
        return (
          <span className="font-medium">
            ₹ {row.original.totalOrderAmount?.toFixed(2) || "0.00"}
          </span>
        );
      },
    },
    {
      header: "Commission %",
      accessorKey: "commissionPercentage",
      cell: ({ row }: { row: any }) => {
        return (
          <span>
            {row.original.commissionPercentage
              ? `${row.original.commissionPercentage}%`
              : "-"}
          </span>
        );
      },
    },
    {
      header: "Commission Earned (₹)",
      accessorKey: "commissionAmount",
      cell: ({ row }: { row: any }) => {
        return (
          <span className="font-semibold text-green-600">
            ₹ {row.original.commissionAmount?.toFixed(2) || "0.00"}
          </span>
        );
      },
    },
    {
      header: "Payment Status",
      accessorKey: "isPaid",
      cell: ({ row }: { row: any }) => {
        const isPaid = row.original.isPaid;
        return (
          <StatusBadge status={isPaid ? "Paid" : "Pending"} />
        );
      },
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => {
        const date = row.original.createdAt;
        return (
          <span>
            {date ? new Date(date).toLocaleDateString() : "-"}
          </span>
        );
      },
    },
  ];
};