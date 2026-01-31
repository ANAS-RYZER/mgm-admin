import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

export const productColumns = [
  {
    header: 'Product ID',
    accessorKey: '_id',
    cell: ({ row }: { row: any }) => {
      const shortId = row.original._id.slice(0, 6);
      return (
        <span className="font-mono text-xs">{`PRD-${shortId}` || '-'}</span>
      );
    },
  },
  {
    header: 'SKU',
    accessorKey: 'sku',
    cell: ({ row }: { row: any }) => {
      return (
        <span className="font-medium">{row.original.sku || '-'}</span>
      );
    },
  },
  {
    header: 'Product Name',
    accessorKey: 'name',
    cell: ({ row }: { row: any }) => {
      return (
        <span>{row.original.name || '-'}</span>
      );
    },
  },
  {
    header: 'categories',
    accessorKey: 'categories',
    cell: ({ row }: { row: any }) => {
      return (
        <span className="capitalize">{row.original.categories || '-'}</span>
      );
    },
  },
  {
    header: 'Price',
    accessorKey: 'mrpPrice',
    cell: ({ row }: { row: any }) => {
      const price = row.original.mrpPrice;
      return (
        <span>₹{price ? price.toLocaleString('en-IN') : '-'}</span>
      );
    },
  },


  {
    header: 'Actions',
    accessorKey: 'action',
    cell: ({ row }: { row: any }) => {
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle view action
              console.log('View product:', row.original);
            }}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle edit action
              console.log('Edit product:', row.original);
            }}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Handle delete action
              console.log('Delete product:', row.original);
            }}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];