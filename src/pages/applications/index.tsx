import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TableComponent from "@/components/TableComponent";
import { applicationListCols } from "./schema/applicationListCols";
import useGetAllApplications from "@/hooks/applications/useGetApplications";
import Pagination from "@/components/pagination/pagination";
import queryString from "query-string";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingSpinner from "@/components/LoadingSpinner";

const Applications = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<string>("");
  const searchParams = useSearchParams();
  const { pathname } = useLocation();
  const queryParams = queryString.parse(searchParams.toString());
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

  const currentPage = Number(queryParams?.page) || 1;
  const limit = Number(queryParams?.limit) || 10;

  const cols = applicationListCols();

  const { data: applications, isFetching: isLoadingApplications } =
    useGetAllApplications({
      status,
      search,
      page: currentPage,
      limit,
    });

  const onPageChange = (page: number) => {
    navigate(
      `${pathname}?page=${page}&limit=${applications?.pagination?.limit || 10}`,
    );
  };

  const onPageSizeChange = (pageSize: number) => {
    navigate(`${pathname}?page=1&limit=${pageSize}`);
  };

  return (
    <AdminLayout
      title="Application Management"
      description="Manage your applications and their details"
      className="space-y-8"
      searchBar={false}
    >
      <section className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Applications</h2>
            <p className="text-sm text-muted-foreground">
              Browse applications, review information, and track status.
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
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl  bg-background">
          {isLoadingApplications ? (
            <div className="p-4 mt-10 text-sm text-muted-foreground">
              <LoadingSpinner label={"Loading Applications..."} />
            </div>
          ) : (
            <TableComponent
              columns={cols}
              data={applications?.data}
              model="Application"
            />
          )}
        </div>
        {applications?.pagination && (
          <Pagination
            {...applications?.pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </section>
    </AdminLayout>
  );
};

export default Applications;
