import { ReactNode, useState } from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const AdminLayout = ({ title, description, children, className }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-background to-cream-dark text-foreground">
      <div className="relative flex min-h-screen">
        <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <main className="flex-1 lg:ml-72">
          <AdminHeader 
            title={title} 
            description={description} 
            onSidebarToggle={toggleSidebar}
            isSidebarOpen={sidebarOpen}
          />
          <div className={cn("mt-10 px-6 pb-12 lg:px-10", className)}>{children}</div>
        </main>
      </div>
    </div>
  );
};
