import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";

export const orderProductsCols = () => {
    return [
        {
            header: "Product SKU",
            accessorKey: "productSku",
            cell: ({ row }: { row: any }) => {
                return <span className="font-medium">{row.original.productSku || "-"}</span>;
            },
        },
        {
            header: "Product Name",
            accessorKey: "productName",
            cell: ({ row }: { row: any }) => {
                return <span className="font-medium">{row.original.productName || "-"}</span>;
            },
        },
        {
            header: "Product Price",
            accessorKey: "productPrice",
            cell: ({ row }: { row: any }) => {
                return <span className="font-medium">{row.original.productPrice || "-"}</span>;
            },
        }
    ];
};
