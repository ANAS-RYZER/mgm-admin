import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {

  Plus,

  Search,

} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "@/components/TableComponent";
import { productColumns } from "./schema/columns";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";



const Products = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  const { mutate: getAllProducts, isPending: isLoadingProducts } =
    useGetAllProducts();


  useEffect(() => {
    getAllProducts(undefined, {
      onSuccess: (data: any) => {
        setProducts(data.data);
      },
    });
  }, [getAllProducts]);
  return (
    <AdminLayout
      title="Product Catalogue"
      description="Curate inventory, manage artisanship pipelines, and govern MGM Jewels collections."
      className="space-y-8"
    >
      <section className="">
        <Card className="border-border/60 bg-background/85 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Featured Inventory</CardTitle>
              <CardDescription>
                Monitor stock posture across hero SKUs.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/add-product")}
                className="gap-2"
              >
                <Plus className="h-4 w-4" /> Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

            </div>

            {/* Enhanced Product Table */}
            <div className="rounded-lg border">
              {isLoadingProducts ? (
                <div className="p-4 text-sm text-muted-foreground">
                  Loading products...
                </div>
              ) : (
                <TableComponent
                  columns={productColumns}
                  data={products}
                  model="product"
                />
              )}
            </div>
          </CardContent>
        </Card>

      </section>


    </AdminLayout>
  );
};

export default Products;
