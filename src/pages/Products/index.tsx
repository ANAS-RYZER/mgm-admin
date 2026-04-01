import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TableComponent from "@/components/TableComponent";
import { productColumns } from "./schema/columns";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import queryString from "query-string";
import Pagination from "@/components/pagination/pagination";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingSpinner from "@/components/LoadingSpinner";
import { categories, categoryColors } from "@/lib/global";
import clsx from "clsx";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<string>("");
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  console.log("Current Page:", currentPage, "Limit:", limit, "Search:", search);
  const { data: products, isFetching: isLoadingProducts } = useGetAllProducts({
    page: currentPage,
    limit,
    search,
    category,
  });

  const onPageChange = (page: number) => {
    navigate(
      `${pathname}?page=${page}&limit=${products?.pagination?.limit || 10}`,
    );
  };

  const onPageSizeChange = (pageSize: number) => {
    navigate(`${pathname}?page=1&limit=${pageSize}`);
  };

  return (
    <AdminLayout
      title="Product Catalogue"
      description="Curate inventory, manage artisanship pipelines, and govern MGM Jewels collections."
      className="space-y-8"
    >
      <section className="space-y-6 z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Featured Inventory</h2>
            <p className="text-sm text-muted-foreground">
              Monitor stock posture across hero SKUs.
            </p>
          </div>

          <Button onClick={() => navigate("/add-product")} className="gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>

        {/* Search */}
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
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((ctgry) => (
            <Button
              key={ctgry.value}
              className={clsx(
                ctgry.value === category
                  ? ctgry.active
                  : categoryColors[ctgry.value],
                "capitalize border rounded-full shadow-none hover:text-white",
                ctgry.hover,
              )}
              size="sm"
              onClick={() => {
                setCategory(ctgry.value);
              }}
            >
              {ctgry.label}
            </Button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl bg-background">
          {isLoadingProducts ? (
            <div className="p-4 mt-10 text-sm text-muted-foreground">
              <LoadingSpinner label={"Loading Products..."} />
            </div>
          ) : (
            <TableComponent
              columns={productColumns}
              data={products?.data}
              model="product"
            />
          )}
        </div>
        {products?.pagination && (
          <Pagination
            {...products?.pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </section>
    </AdminLayout>
  );
};

export default Products;
