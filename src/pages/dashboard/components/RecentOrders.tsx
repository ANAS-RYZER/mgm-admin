"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetOrderListCols from "@/hooks/orders/useGetOrderList";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { formatCurrency } from "@/lib/formatCurrency";
import { useNavigate } from "react-router-dom";

const RecentOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data: orders, isFetching: isLoadingOrders } = useGetOrderListCols({
    search,
    page: page,
    limit,
  });

  console.log("Recent Orders Data:", orders);
  console.log("Recent Orders Loading:", orders?.data?.orders?.status);
  return (
    <>
      <div className="flex items-start justify-between w-full mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>

          <p className="text-sm text-slate-500">
            View your latest customer orders.
          </p>
        </div>

        <Button variant="link" onClick={() => navigate("/orders")}>
          View All
        </Button>
      </div>

      {/* Orders */}
      <div className="space-y-1">
        {orders?.data?.orders?.map((order: any) => (
          <div
            key={order?._id}
            className="flex items-center justify-between py-2 border-b border-black-100 last:border-none"
          >
            {/* Left */}
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={order.products?.[0]?.image}
                  alt={order.products?.[0]?.name}
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-700 text-sm">
                  {order.products?.[0]?.sku}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {order.products?.[0]?.name}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <p className=" text-slate-700 text-right">{formatCurrency(order?.amount)}</p>

              <Badge
                className={`rounded-full px-2 py-1 text-xs font-medium border
                    ${
                      order.status === "create_order"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                    }
                  `}
              >
                {`${order.status=== "create_order" ? "Order Created" : "Order Not Created"}`}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentOrders;
