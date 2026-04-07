import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TableComponent from "@/components/TableComponent";
import useGetAllApplications from "@/hooks/applications/useGetApplications";
import { agentListCols } from "./schema/agentListCols";
import useGetAllAgents from "@/hooks/agents/useGetAllAgents";
import queryString from "query-string";
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/pagination/pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { set } from "lodash";

const Agents = () => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const { pathname } = useLocation();
  const queryParams = queryString.parse(searchParams.toString());
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const cols = agentListCols();

  const { data: agents, isFetching: isLoadingAgents } = useGetAllAgents({
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
      title="Partner Management"
      description="Monitor partner's activities and performance."
      className="space-y-8"
      searchBar={false}
    >
      <section className="space-y-6 z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Partners</h2>
            <p className="text-sm text-muted-foreground">
              Browse partners, check their information, and track activity.
            </p>
          </div>

          {/* Future action button */}
          {/*
          <Button
            onClick={() => navigate("/add-agent")}
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
              placeholder="Search Partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl  bg-background">
          {isLoadingAgents ? (
            <div className="p-4 mt-10 text-sm text-muted-foreground">
              <LoadingSpinner label={"Loading Partners..."} />
            </div>
          ) : (
            <TableComponent columns={cols} data={agents?.data} model="Agents" />
          )}
        </div>

        {agents?.pagination && (
          <Pagination
            {...agents?.pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </section>
    </AdminLayout>
  );
};

export default Agents;
