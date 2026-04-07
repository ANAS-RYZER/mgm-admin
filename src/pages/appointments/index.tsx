import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, LoaderCircle, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import TableComponent from "@/components/TableComponent";
import useGetAllApplications from "@/hooks/applications/useGetApplications";
import { applicationListCols } from "../applications/schema/applicationListCols";
import { appointmentListCols } from "./schema/appointmentListCols";
import useGetAppointments from "@/hooks/appointments/useGetAppointments";
import DashboardCard from "./components/DashboardCard";
import Pagination from "@/components/pagination/pagination";
import queryString from "query-string";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingSpinner from "@/components/LoadingSpinner";
import { set } from "lodash";

const Appointments = () => {
  const navigate = useNavigate();

  const searchParams = useSearchParams();
  const { pathname } = useLocation();
  const queryParams = queryString.parse(searchParams.toString());
  const [searchTerm, setSearchTerm] = useState("");
  const search = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const cols = appointmentListCols();

  const { data: appointments, isFetching: isLoadingAppointments } =
    useGetAppointments({ search, page: page, limit });
  console.log("Appointments data:", appointments);

  const onPageChange = (page: number) => {
      setPage(page);
  };

  const onPageSizeChange = (pageSize: number) => {
    setLimit(pageSize);
     setPage(1); // Reset to first page when page size changes
  };

  return (
    <AdminLayout
      title="Visit Management"
      description="Monitor store visit appointments and their details."
      className="space-y-8"
      searchBar={false}
    >
      <section className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">All Appointments</h2>
            <p className="text-sm text-muted-foreground">
              
              Browse and manage all store visit appointments.
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
        <div className="w-full grid grid-cols-3 gap-2">
          <DashboardCard
            title="Today's Visit"
            value={appointments?.todayAppointments || 0}
            icon={<Clock size={20} className=" text-gold" />}
          />
          <DashboardCard
            title="Total Appointments"
            value={appointments?.totalAppointments || 0}
            icon={<Calendar size={20} className=" text-gold" />}
          />
          {/* <DashboardCard
            title="Today's Visit"
            value={2}
            icon={<Clock size={20} className=" text-gold" />}
          /> */}
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
          {isLoadingAppointments ? (
            <div className="p-4 mt-10 text-sm text-muted-foreground">
              <LoadingSpinner label={"Loading Appointments..."} />
            </div>
          ) : (
            <TableComponent
              columns={cols}
              data={appointments?.appointments || []}
              model="Appointment"
            />
          )}
        </div>
        {appointments?.pagination && (
          <Pagination
            {...appointments?.pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      </section>
    </AdminLayout>
  );
};

export default Appointments;
