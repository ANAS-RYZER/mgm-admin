import { AdminLayout } from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/pagination/pagination";
import TableComponent from "@/components/TableComponent";
import { Input } from "@/components/ui/input";
import useGetCommisions from "@/hooks/agents/commision/useGetCommisions";
import { Search } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { commissionListCols } from "../../schema/commsionListCols";
import useGetBasicDetails from "@/hooks/agents/useGetBasicDetails";

const Commission = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data: commisions, isFetching: isLoading } = useGetCommisions(
    id!,
    page,
    limit,
  );
  const { data: agentBasicDetails, isFetching: isLoadingAgentBasicDetails } =
    useGetBasicDetails(id);
  const onPageChange = (page: number) => {
    setPage(page);
  };
  console.log(commisions);
  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
    setPage(1);
  };
  const cols = commissionListCols();

  return (
    <AdminLayout
      title={`${agentBasicDetails?.data?.name || "Partner"}'s Commission History`}
      description="Track commission earnings and payment updates."
      searchBar={false}
      isBack
    >
      <section className="space-y-6 z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Commision Logs</h2>
            <p className="text-sm text-muted-foreground">
              {`Review the commission history of ${agentBasicDetails?.data?.name || "partner"}.`}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search Partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="rounded-xl  bg-background">
          {isLoading ? (
            <div className="p-4 mt-10 text-sm text-muted-foreground">
              <LoadingSpinner label={"Loading Commissions..."} />
            </div>
          ) : (
            <TableComponent
              columns={cols}
              data={commisions.items}
              model="Commisions"
            />
          )}
        </div>

        {commisions?.pagination && (
          <Pagination
            {...commisions?.pagination}
            currentPage={commisions?.pagination?.page}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </section>
    </AdminLayout>
  );
};

export default Commission;
