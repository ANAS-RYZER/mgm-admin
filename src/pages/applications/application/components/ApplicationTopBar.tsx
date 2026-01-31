import { Button } from "@/components/ui/button";
import DecisionActions from "./DecisionActions";
import StatusBadge from "@/components/common/StatusBadge";
import { Check, X } from "lucide-react";

interface Props {
  applicationId: string;
  status: string;
  onUpdateStatus: (status: "approved" | "rejected") => void;
  isUpdating?: boolean;
}

const ApplicationTopBar = ({
  applicationId,
  status,
  onUpdateStatus,
  isUpdating = false,
}: Props) => {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <div>
        <p className="text-sm text-muted-foreground">Application ID</p>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{applicationId}</p>{" "}
          <StatusBadge status={status} />
        </div>
      </div>

      {/* ///Approve/Reject Buttons */}
      <div className="flex gap-2">
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => onUpdateStatus("approved")}
          disabled={isUpdating || status !== "pending"}
        >
          <Check className="mr-2 h-4 w-4" /> Approve
        </Button>
        <Button
          variant="destructive"
          onClick={() => onUpdateStatus("rejected")}
          disabled={isUpdating || status !== "pending"}
        >
          <X className="mr-2 h-4 w-4" /> Reject
        </Button>
      </div>
    </div>
  );
};

export default ApplicationTopBar;
