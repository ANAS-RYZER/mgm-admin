import { AdminLayout } from "@/components/layout/AdminLayout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TableComponent from "@/components/TableComponent";
import Pagination from "@/components/pagination/pagination";
import queryString from "query-string";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingSpinner from "@/components/LoadingSpinner";
import { orderListCols } from "./schema/orderCols";
import useGetOrderListCols from "@/hooks/orders/useGetOrderList";

const Orders = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const searchParams = useSearchParams();
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

  const cols = orderListCols();

  const { data: orders, isFetching: isLoadingOrders } = useGetOrderListCols({
    search,
    page: page,
    limit,
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };

  return (
    <AdminLayout
      title="Visit Order Management"
      description="Monitor and manage orders efficiently."
      className="space-y-8"
      searchBar={false}
    >
      <section className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Orders</h2>
            <p className="text-sm text-muted-foreground">
              Monitor and manage orders and their details.
            </p>
          </div>

          {/* Future action button */}
          {/*
          <Button
            onClick={() => navigate("/add-application")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Application
          </Button>
          */}
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by user, email, partner, date…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl  bg-background">
          {isLoadingOrders ? (
            <div className="p-4 mt-10 text-sm text-muted-foreground">
              <LoadingSpinner label={"Loading Orders..."} />
            </div>
          ) : (
            <TableComponent
              columns={cols}
              data={orders?.data?.orders || []}
              model="Orders"
            />
          )}
        </div>
        {orders?.data?.pagination && (
          <Pagination
            {...orders?.data?.pagination}
            limit={orders?.data?.pagination?.limit}
            currentPage={orders?.data?.pagination?.page}
            totalPages={orders?.data?.pagination?.totalPages}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </section>
    </AdminLayout>
  );
};

export default Orders;
