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

const AppointmentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: appointment, isFetching: isAppointmentLoading } =
    useGetAppointmentById(id as string);
  const config = getStatusConfig(appointment?.status);
  const Icon = config.icon || <TimerIcon size={15} className="text-gold" />;
  console.log("Appointment ID:", id);
  console.log("Fetched Appointment:", appointment);
  return (
    <AdminLayout
      title="Appointment Details"
      description="Visit Management and Appointment details"
      className="space-y-8"
      searchBar={false}
    >
      {isAppointmentLoading && (
        <div className="flex items-center justify-center p-10 text-muted-foreground">
          <LoaderCircle size={50} className=" animate-spin text-gold" />
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
          <div className="grid grid-cols-4 gap-4">
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
              valueClass="text-sm font-semibold ml-2 mt-2 "
              leftIcon={<TimerIcon size={15} className="text-gold" />}
            />
            <DashboardCard
              title="Status"
              value={
                <Badge
                  className={clsx(
                    config.bgColor,
                    config.borderColor,

                    "cursor-pointer text-white rounded-md",
                  )}
                >
                  {config.text}
                </Badge>
              }
              titleClass="text-xs"
              valueClass="text-sm  font-semibold"
              leftIcon={<Icon size={15} className="text-gold" />}
            />
            {/* <DashboardCard/> */}
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-5">
              <UserAction
                name={appointment?.userDetails?.fullName}
                status={appointment?.status || "CONFIRMED"}
              />
              <div className="flex gap-5">
                <UserProfileCard
                  title="Customer Details"
                  name={appointment?.userDetails?.fullName || "User"}
                  email={
                    appointment?.userDetails?.email || "mrunal@example.com"
                  }
                  phone={appointment?.userDetails?.phone || "+91 9876543210"}
                  id={
                    <>
                      User Id:{" "}
                      <span className="text-black">
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
                  phone={appointment?.agentDetails?.phone || "+91 9876543210"}
                  id={
                    <>
                      User Id:{" "}
                      <span className="text-black">
                        {appointment?.agentDetails?.referralCode || "12345"}
                      </span>
                    </>
                  }
                />
              </div>
            </div>

            <div className="col-span-1 border rounded-lg shadow-md p-5 overflow-hidden bg-white/50">
              <h1 className="text-lg font-semibold mb-2">
                Products Interested
              </h1>
              <hr />
              {appointment?.productDetails &&
              appointment.productDetails.length > 0 ? (
                <div className="grid grid-cols-2 gap-4  mt-5 overflow-y-auto max-h-[300px] pr-2">
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
                <p className="text-sm text-muted-foreground">
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
