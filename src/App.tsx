import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "@/router/router";
import { Toaster } from "sonner";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors />
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
