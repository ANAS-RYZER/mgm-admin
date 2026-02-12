import { Button } from "@/components/ui/button";

interface UserActionProps {
  name?: string;
  status?: string;
}

const UserAction = ({ name, status }: UserActionProps) => {
  const isActionAllowed = status === "CONFIRMED";

  const renderOutcome = () => {
    if (status === "ISVISITED")
      return `${name || "User"} has just visited the store and didn't make a purchase.`;

    if (status === "ISPURCHASED")
      return `${name || "User"} visited and made a purchase.`;

    if (status === "NOTVISITED")
      return `${name || "User"} did not visit the store.`;

    return "No actions available.";
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center rounded-lg border p-6 shadow-md bg-white">
      {isActionAllowed ? (
        <>
          <h1 className="text-xl font-semibold">
            What did {name || "user"} do?
          </h1>

          <p className="text-sm text-muted-foreground">
            Confirm the visit outcome:
          </p>

          <div className="flex gap-3 mt-4">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Mark as Not Visited
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Mark as Visited
            </Button>

            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Mark as Purchased
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl font-semibold">Visit Outcome</h1>

          <p className="text-sm text-muted-foreground mt-2">
            {renderOutcome()}
          </p>
        </>
      )}
    </div>
  );
};

export default UserAction;
