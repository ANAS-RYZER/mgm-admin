import { Button } from "@/components/ui/button";

const DecisionActions = () => {
  return (
    <div className="flex gap-2">
      <Button >Approve</Button>
      <Button variant="destructive">Reject</Button>
    </div>
  );
};

export default DecisionActions;
