import { CheckCircle, Info, MapPinCheck, PackageCheck, ShoppingBagIcon } from "lucide-react";
import React from "react";

type AppointmentStatus = "CONFIRMED" | "ISVISITED" | "ISPURCHASED";

interface StatusBannerProps {
  userName: string;
  status: AppointmentStatus;
  date?: string;
  timeSlot?: string;
  amount?: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({
  userName,
  status,
  date,
  timeSlot,
  amount,
}) => {
  const renderContent = () => {
    switch (status) {
      case "CONFIRMED":
        return {
          text: `${userName} has confirmed the appointment and is scheduled to visit on ${date} at ${timeSlot}.`,
          className: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <CheckCircle className="text-blue-600 text-lg" />,
        };

      case "ISVISITED":
        return {
          text: `${userName} visited the store on ${date} but no purchases were made.`,
          className: "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: <MapPinCheck className="text-yellow-600 text-lg" />,
        };

      case "ISPURCHASED":
        return {
          text: `${userName} completed a store visit and purchased  on ${date}.`,
          className: "bg-green-50 text-green-700 border-green-200",
          icon: <PackageCheck className="text-green-600 text-lg" />,
        };

      default:
        return {
          text: "",
          className: "",
          icon: null,
        };
    }
  };

  const { text, className, icon } = renderContent();

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border text-sm font-medium ${className}`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default StatusBanner;
