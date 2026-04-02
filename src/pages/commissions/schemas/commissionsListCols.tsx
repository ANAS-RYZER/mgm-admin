import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { formatCurrency } from "@/pages/orders/schema/orderCols";

export const commissionsListCols = () => {
    const navigate = useNavigate();
    return [
        {
            header: "Order ID",
            accessorKey: "orderId",
            cell: ({ row }: { row: any }) => {
                const orderId = row.original.orderId;
                return <span className="font-mono text-xs">{`ORD-${orderId.slice(0, 6)}` || "-"}</span>;
            },
        },
        {
            header: "Partner ID",
            accessorKey: "partnerId",
            cell: ({ row }: { row: any }) => {
                return <span className="font-medium">{row.original.partnerId || "-"}</span>;
            },
        },
        {
            header: "Partner Details",
            accessorKey: "partnerDetails",
            meta: {
                exportValue: (row: any) => {
                    const source = row?.original ?? row;
                    return `${source?.partnerName || "-"} (${source?.partnerEmail || "-"})`;
                },
            },      
            cell: ({ row }: { row: any }) => {
                return <div className="">
                    <h1>{row.original.partnerName || "-"}</h1>
                    <p className="text-xs mt-2">{row.original.partnerEmail || "-"}</p>
                </div>
            },
        },
        {
            header: "Commission Amount",
            accessorKey: "commissionAmount",
            cell: ({ row }: { row: any }) => {
                return <span className="font-medium">{formatCurrency(row.original.commissionAmount) || "-"}</span>;
            },
        },
        {
            header: "Actions",
            accessorKey: "action",
            meta: {
                excludeFromExport: true,
            },
            cell: ({ row }: { row: any }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                navigate(`/commissions/${row.original.orderId}`);
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
