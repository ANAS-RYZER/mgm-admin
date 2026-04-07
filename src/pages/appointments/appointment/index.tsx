import { AdminLayout } from "@/components/layout/AdminLayout";
import React from "react";
import { useParams } from "react-router-dom";
import StatusBanner from "../components/StatusBanner";
import useGetAppointmentById from "@/hooks/appointments/useGetAppointmentById";
import {
  Calendar,
  Hash,
  IdCard,
  LoaderCircle,
  Timer,
  TimerIcon,
} from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import { getStatusConfig } from "../lib/Status";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import UserAction from "../components/UserAction";
import UserProfileCard from "../components/UserProfileCard";
import ProductCard from "../components/ProductCard";
import useUpdateAppointment from "@/hooks/appointments/useUpdateAppointment";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const AppointmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: appointment, isFetching: isAppointmentLoading } =
    useGetAppointmentById(id as string);
  const { mutate: updateAppointment, isPending: updatingAppointment } =
    useUpdateAppointment();
  const config = getStatusConfig(appointment?.status);
  const Icon = config.icon || <TimerIcon size={15} className="text-gold" />;
  const handleStatusChange = (newStatus: string) => {
    if (!id) return;
    updateAppointment(
      { appointmentId: id, data: { status: newStatus } },
      {
        onSuccess: () => {
          // Optionally show a success message or perform additional actions}}
          toast.success("Appointment status updated successfully");
        },
        onError: (error) => {
          console.error("Error updating appointment status:", error);
          toast.error("Failed to update appointment status");
        },
      },
    );
  };

  return (
    <AdminLayout
      title={`Appointment Details - ${appointment?.userDetails?.fullName || "Customer"}`}
      description={`View appointment details and visit outcome for ${appointment?.userDetails?.fullName || "Customer"}.`}
      className="space-y-8"
      searchBar={false}
      isBack={true}
    >
      {isAppointmentLoading && (
        <div className="p-4 mt-10 text-sm text-muted-foreground">
          <LoadingSpinner label={"Loading Appointment..."} />
        </div>
      )}
      {!isAppointmentLoading && appointment && (
        <section className="space-y-5">
          <StatusBanner
            userName={appointment?.userDetails?.fullName || "User"}
            status={appointment?.status || "CONFIRMED"}
            date={appointment?.date || "---"}
            timeSlot={
              appointment?.slotStartTime + " - " + appointment?.slotEndTime ||
              "---"
            }
          />

          {/* TOP INFO CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard
              title="Appointment ID"
              value={appointment?._id || "---"}
              titleClass="text-xs"
              valueClass="text-sm font-semibold truncate ml-2 mt-2"
              leftIcon={<Hash size={15} className="text-gold" />}
            />

            <DashboardCard
              title="Date"
              value={appointment?.date || "---"}
              titleClass="text-xs"
              valueClass="text-sm font-semibold ml-2 mt-2"
              leftIcon={<Calendar size={15} className="text-gold" />}
            />

            <DashboardCard
              title="Slot"
              value={
                appointment?.slotStartTime + " - " + appointment?.slotEndTime ||
                "---"
              }
              titleClass="text-xs"
              valueClass="text-sm font-semibold ml-2 mt-2"
              leftIcon={<TimerIcon size={15} className="text-gold" />}
            />

            <DashboardCard
              title="Status"
              value={
                <Badge
                  className={clsx(
                    config.bgColor,
                    config.borderColor,
                    "text-white rounded-md",
                  )}
                >
                  {config.text}
                </Badge>
              }
              titleClass="text-xs"
              valueClass="text-sm font-semibold"
              leftIcon={<Icon size={15} className="text-gold" />}
            />
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-5">
              <UserAction
                name={appointment?.userDetails?.fullName}
                status={appointment?.status || "CONFIRMED"}
                statusChange={handleStatusChange}
              />

              {/* PROFILE CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <UserProfileCard
                  title="Customer Details"
                  name={appointment?.userDetails?.fullName || "User"}
                  email={
                    appointment?.userDetails?.email || "mrunal@example.com"
                  }
                  role="customer"
                  // phone={appointment?.userDetails?.phoneNumber || "+91 9876543210"}
                  id={
                    <>
                      User Id:
                      <span className="text-black ml-1">
                        {appointment?.userDetails?._id || "12345"}
                      </span>
                    </>
                  }
                />

                <UserProfileCard
                  title="Partner Details"
                  name={appointment?.agentDetails?.name || "Partner"}
                  email={
                    appointment?.agentDetails?.email || "partner@example.com"
                  }
                  phone={
                    appointment?.agentDetails?.phoneNumber || "+91 9876543210"
                  }
                  role="partner"
                  id={
                    <>
                      User Id:
                      <span className="text-black ml-1">
                        {appointment?.agentDetails?.referralCode || "12345"}
                      </span>
                    </>
                  }
                />
              </div>
            </div>

            {/* RIGHT SIDE PRODUCTS */}
            <div className="border rounded-lg shadow-md p-5 bg-white/50">
              <h1 className="text-lg font-semibold mb-2">
                Products Interested
              </h1>
              <hr />

              {appointment?.productDetails?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4 mt-5 max-h-[350px] overflow-y-auto pr-2">
                  {appointment.productDetails.map((product: any) => (
                    <ProductCard
                      key={product._id}
                      image={product.image}
                      name={product.name}
                      sku={product.sku}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-3">
                  No products available
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </AdminLayout>
  );
};

export default AppointmentDetails;
