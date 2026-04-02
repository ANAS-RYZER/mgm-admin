import { Calendar, Clock, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig } from "@/pages/appointments/lib/Status";
import clsx from "clsx";

const AppointmentCard = ({ appointment }: { appointment: any }) => {
  return (
    <div className="border rounded-xl p-5 bg-white space-y-4">
      {/* 🔹 Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-md text-amber-600 font-semibold mb-2">
            Appointment Details
          </p>

          <h2 className="text-lg font-medium">#{appointment._id}</h2>

          <p className="text-sm text-muted-foreground mt-2">
            Referral:{" "}
            <span className="font-medium text-foreground">
              {appointment.referralCode}
            </span>
          </p>
        </div>

        {/* Status Badge */}
        <Badge
          className={clsx(
            getStatusConfig(appointment.status).bgColor,
            getStatusConfig(appointment.status).textColor,
            getStatusConfig(appointment.status).borderColor,
            "text-white",
          )}
        >
          {getStatusConfig(appointment.status).text}
        </Badge>
      </div>

      <hr />

      {/* 🔹 Info Grid */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        {/* Date */}
        <div className="flex items-start gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground text-xs">Date</p>
            <p className="font-medium">
              {format(new Date(appointment.date), "dd MMM yyyy")}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-2">
          <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground text-xs">Time</p>
            <p className="font-medium">
              {appointment.slotStartTime} - {appointment.slotEndTime}
            </p>
            <p className="text-xs text-muted-foreground">
              {appointment.slotCode}
            </p>
          </div>
        </div>

        {/* Visit Type */}
        <div className="flex items-start gap-2">
          <Store className="w-4 h-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground text-xs">Visit</p>
            <p className="font-medium">
              {appointment.visitType === "STORE"
                ? "In-Store Visit"
                : appointment.visitType}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Action */}
      <div className="flex justify-end">
        <Button className="flex items-center gap-2" variant="default">
          View Details
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AppointmentCard;
