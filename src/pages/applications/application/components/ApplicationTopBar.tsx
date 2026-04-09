import { Button } from "@/components/ui/button";
import DecisionActions from "./DecisionActions";
import StatusBadge from "@/components/common/StatusBadge";
import { Check, X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  applicationId: string;
  status: string;
  onUpdateStatus: (
    status: "approved" | "rejected",
    rejectionReason?: string,
  ) => void;
  isUpdating?: boolean;
}

const ApplicationTopBar = ({
  applicationId,
  status,
  onUpdateStatus,
  isUpdating = false,
}: Props) => {
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    const reason = rejectReason.trim();
    if (!reason) return;

    onUpdateStatus("rejected", reason);
    setIsRejectDialogOpen(false);
    setRejectReason("");
  };

  return (
    <>
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
            onClick={() => setIsRejectDialogOpen(true)}
            disabled={isUpdating || status !== "pending"}
          >
            <X className="mr-2 h-4 w-4" /> Reject
          </Button>
        </div>
      </div>
      <Dialog
        open={isRejectDialogOpen}
        onOpenChange={(open) => {
          setIsRejectDialogOpen(open);
          if (!open) setRejectReason("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>
              Please enter the rejection reason before continuing.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Type rejection reason..."
            rows={5}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isUpdating || !rejectReason.trim()}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationTopBar;
