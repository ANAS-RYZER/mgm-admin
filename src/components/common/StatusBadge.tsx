import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import clsx from "clsx";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const GREEN_STATUSES = ["approved", "success", "active"];
const YELLOW_STATUSES = ["pending", "in-progress", "processing"];
const RED_STATUSES = ["rejected", "failed", "inactive"];

const getVariant = (status: string) => {
  const value = status.toLowerCase();

  if (GREEN_STATUSES.includes(value))
    return "bg-green-100 text-green-800 border-green-400";
  if (YELLOW_STATUSES.includes(value))
    return "bg-yellow-100 text-yellow-800 border-yellow-400";
  if (RED_STATUSES.includes(value))
    return "bg-red-100 text-red-800 border-red-400";

  return "secondary";
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge className={clsx("capitalize cursor-pointer", getVariant(status), className)}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
