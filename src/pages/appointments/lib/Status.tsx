import {
  CheckCircle,
  XCircle,
  Clock,
  MapPinCheck,
  HelpCircle,
} from "lucide-react";



type AppointmentStatus = "CONFIRMED" | "ISVISITED" | "ISPURCHASED" | "UNKNOWN";

interface StatusConfig {
  text: string;
  icon: React.ElementType;   
  bgColor: string;
  borderColor: string;
  textColor: string;
}


export const APPOINTMENT_STATUS_CONFIG: Record<
  AppointmentStatus,
  StatusConfig
> = {
  CONFIRMED: {
    text: "Confirmed",
    icon: CheckCircle,
    bgColor: "bg-green-500",
    borderColor: "border-green-300",
    textColor: "text-green-700",
  },

  ISVISITED: {
    text: "Visited",
    icon: MapPinCheck,
    bgColor: "bg-blue-500",
    borderColor: "border-blue-300",
    textColor: "text-blue-700",
  },

  ISPURCHASED: {
    text: "Purchased",
    icon: Clock,
    bgColor: "bg-yellow-500",
    borderColor: "border-yellow-300",
    textColor: "text-yellow-700",
  },

  UNKNOWN: {
    text: "Unknown",
    icon: HelpCircle,
    bgColor: "bg-gray-500",
    borderColor: "border-gray-300",
    textColor: "text-gray-700",
  },
};


export const getStatusConfig = (status?: string): StatusConfig => {
  if (!status) return APPOINTMENT_STATUS_CONFIG.UNKNOWN;

  return (
    APPOINTMENT_STATUS_CONFIG[status.toUpperCase() as AppointmentStatus] ||
    APPOINTMENT_STATUS_CONFIG.UNKNOWN
  );
};
