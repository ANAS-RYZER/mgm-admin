"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useGetTopProducts } from "../hooks/useGetTopProducts";

const TopProducts = () => {
  const naviagate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: products, isFetching: isLoadingProducts } = useGetTopProducts();
  console.log("Top Products Data:", products);
  return (
    <>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Top Products</h2>

          <p className="text-sm text-slate-500">
            View your top selling products.
          </p>
        </div>

        <Button
        variant="link"
          className="text-sm font-semibold  hover:underline"
          onClick={() => {
            naviagate("/products");
          }}
        >
          View All
        </Button>
      </div>
      {/* Orders */}
      <div className="space-y-1">
        {products?.products?.map((product: any) => (
          <div
            key={product._id}
            className="flex items-center justify-between py-2 border-b border-black-100 last:border-none"
          >
            {/* Left */}
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500 mt-1">{product.name}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <Badge
                className={`rounded-full px-2 py-1 text-xs font-medium border bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100`}
              >
                {product.quantitySold} sold
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TopProducts;
