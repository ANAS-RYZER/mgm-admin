import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-mgm text-primary-foreground">
      <div className="rounded-3xl border border-primary-foreground/20 bg-primary-foreground/10 px-10 py-12 text-center backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70">MGM Admin</p>
        <h1 className="mt-4 text-4xl font-display font-semibold">Page Not Found</h1>
        <p className="mt-3 text-sm text-primary-foreground/70">
          The requested route could not be located. Return to the executive overview to continue managing MGM Jewels.
        </p>
        <Button asChild variant="secondary" className="mt-6 font-semibold text-foreground">
          <Link to="/">Back to Overview</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
