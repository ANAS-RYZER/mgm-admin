import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  const message = isRouteError ? error.statusText : (error as Error)?.message ?? "Something went wrong";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-cream via-background to-cream-dark p-6">
      <h1 className="font-elegant text-2xl text-foreground">
        {isRouteError && "status" in error ? `${error.status} — ` : ""}
        {message}
      </h1>
      <Link to="/">
        <Button variant="outline">Go home</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
