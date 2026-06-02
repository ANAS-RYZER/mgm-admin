import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import DashboardCard from "../appointments/components/DashboardCard";
import {
  Badge,
  BaggageClaim,
  BriefcaseIcon,
  Calendar,
  CarTaxiFront,
  Clock,
  Loader2,
  Percent,
  ShoppingBag,
  ShoppingCart,
  Users2,
} from "lucide-react";
import useGetAppointments from "@/hooks/appointments/useGetAppointments";
import { useDebounce } from "@/hooks/useDebounce";
import AdminDashboardCards from "./components/AdminDashboardCards";
import SalesOverview from "./components/SalesOverview";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";
import RecentApplications from "./components/RecentApplications";
import CommissionSummary from "./components/CommissionSummary";
import { useGetDashboardSummary } from "./hooks/useGetdashboardSummary";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";

const index = () => {
  const { data, isLoading, error } = useGetDashboardSummary();

  if (isLoading) {
    return (
      <Card className="p-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }
  return (
    <AdminLayout
      title="Dashboard"
      description="Get a complete overview of business performance, customer activity, product sales, and revenue analytics."
      searchBar={false}
    >
      <section className="space-y-6">
        <div className="w-full grid grid-cols-4 gap-4 min-w-0">
          <AdminDashboardCards
            title="Total Sales"
            value={formatCurrency(data?.totalSales)}
            icon={
              <ShoppingCart
                size={16}
                className="text-amber-700 bg-amber-100 p-2 h-10 w-10 rounded-full"
              />
            }
            subTitle="Total Revenue Generated"
          />
          <AdminDashboardCards
            title="Total Orders"
            value={data?.totalOrders || 0}
            icon={
              <ShoppingBag
                size={16}
                className="text-purple-600 bg-purple-100 p-2 h-10 w-10 rounded-full"
              />
            }
            subTitle="Total Orders"
          />
          <AdminDashboardCards
            title="Active Partners"
            value={data?.activePartners || 0}
            icon={
              <Users2
                size={16}
                className=" text-green-600 bg-green-100 p-2 h-10 w-10 rounded-full"
              />
            }
            subTitle="Currently active partners"
          />
          <AdminDashboardCards
            title="Total Commissions"
            value={data?.totalCommissions || 0}
            icon={
              <Percent
                size={16}
                className=" text-blue-600 bg-blue-100 p-2 h-10 w-10 rounded-full"
              />
            }
            subTitle="Earnings from commissions"
          />
        </div>
        <div className="flex w-full gap-4 min-w-0">
          <div className="w-[60%] min-h-[300px] min-w-0">
            <SalesOverview />
          </div>
          <div className="w-[40%] min-w-0">
            <div className="mb-2 border rounded-lg shadow-md p-5 bg-white/50 overflow-hidden min-w-0">
              <RecentOrders />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 items-stretch min-w-0">
          <div className="h-full border rounded-xl shadow-sm p-5 bg-white overflow-hidden min-w-0">
            <TopProducts />
          </div>
          <div className="h-full border rounded-xl shadow-sm p-5 bg-white overflow-hidden min-w-0">
            <RecentApplications />
          </div>
          <div className="h-full border rounded-xl shadow-sm p-5 bg-white overflow-hidden min-w-0">
            <CommissionSummary />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default index;
