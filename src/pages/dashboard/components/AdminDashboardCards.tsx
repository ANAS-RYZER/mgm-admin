import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";
import React from "react";
import SalesOverview from "./SalesOverview";
import RecentOrders from "./RecentOrders";

const AdminDashboardCards = ({
  title,
  value,
  icon,
  subTitle,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  subTitle: string;
}) => {
  return (
    <>
      <Card className="rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            {/* Left Content */}
            <div className="space-y-3">
              <p className="text-base font-medium text-slate-500">{title}</p>

              <h3 className="text-2xl font-bold tracking-tight text-black">
                {value}
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs">{subTitle}</span>
              </div>
            </div>

            {/* Right Icon */}
            <div className="flex items-center justify-center">{icon}</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default AdminDashboardCards;
