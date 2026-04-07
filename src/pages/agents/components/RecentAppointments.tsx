import TableComponent from "@/components/TableComponent";
import { recentAppointmentCols } from "../schema/recentAppointmentCols";

interface RecentAppointment {
  userName: string;
  date: string;
  email: string;
  status: string;
}

const RecentAppointments = ({
  recentAppointments,
}: {
  recentAppointments: RecentAppointment[];
}) => {
  const cols = recentAppointmentCols();
  return (
    <div className="bg-white shadow-md p-5 rounded-md space-y-5 col-span-1 border ">
      <h1 className="text-lg font-medium mb-3">Recent Appointments</h1>
      {recentAppointments.length > 0 ? (
        <div>
          <TableComponent
            border={false}
            columns={cols}
            data={recentAppointments}
          />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          No recent appointments to display.
        </p>
      )}
    </div>
  );
};

export default RecentAppointments;
