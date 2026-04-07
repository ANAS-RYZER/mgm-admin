import { AdminLayout } from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import useGetAgentDashboard from "@/hooks/agents/useGetAgentDashBoard";
import { getInitials } from "@/pages/appointments/components/UserProfileCard";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PartnerInfo from "../components/PartnerInfo";
import DashboardCard from "@/pages/appointments/components/DashboardCard";
import {
  ArrowRight,
  BadgeIndianRupee,
  Banknote,
  Briefcase,
  Calendar,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { formatCurrency } from "@/pages/orders/schema/orderCols";
import RecentAppointments from "../components/RecentAppointments";
import RecentOrders from "../components/RecentOrders";
import { Button } from "@/components/ui/button";

const AgentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: agentDashboard, isFetching: isLoading } = useGetAgentDashboard(
    id!,
  );
  const agentInfo = agentDashboard?.data?.agentInfo;
  const stats = agentDashboard?.data?.stats;
  return (
    <AdminLayout
      title={`Partner Dashboard-${isLoading ? "Loading..." : agentInfo?.name}`}
      description={`Details of ${agentInfo?.name || "Partner"}'s appointments, orders, and total commission earned.`}
      searchBar={false}
      isBack
    >
      {isLoading && (
        <div className="p-4 mt-10 text-sm text-muted-foreground">
          <LoadingSpinner label={"Loading Partner Details..."} />
        </div>
      )}
      {!isLoading && agentDashboard && (
        <>
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full  text-white flex items-center justify-center text-lg font-semibold bg-gradient-mgm">
              {getInitials(agentInfo?.name)}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{agentInfo?.name}</h1>
              <p className="text-sm text-muted-foreground">
                {agentInfo?.agentId}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-5">
            <PartnerInfo
              partnerId={agentInfo?.agentId}
              email={agentInfo?.email}
              phoneNumber={agentInfo?.phoneNumber}
            />
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <DashboardCard
                leftBigIcon={<Calendar />}
                iconBg="text-gold bg-gold/10"
                subTitle="Total Appointments"
                value={stats?.totalAppointments || "0"}
                containerClass="flex items-center gap-4"
              />
              <DashboardCard
                leftBigIcon={<ShoppingBag />}
                iconBg="text-gold bg-gold/10"
                subTitle="Total Orders"
                value={stats?.totalOrders || "0"}
                containerClass="flex items-center gap-4"
              />
              <DashboardCard
                leftBigIcon={<TrendingUp />}
                iconBg="text-gold bg-gold/10"
                subTitle="Total Sale Value"
                value={formatCurrency(stats?.totalSales) || "0"}
                containerClass="flex items-center gap-4"
              />
              <DashboardCard
                leftBigIcon={<BadgeIndianRupee />}
                iconBg="text-gold bg-gold/10"
                subTitle="Total Commission"
                value={formatCurrency(stats?.totalCommission) || "0"}
                containerClass="flex items-center gap-2"
                rightButton={
                  <Button
                    onClick={() => navigate(`/partners/${id}/commissions`)}
                    variant={"ghost"}
                    className="text-xs text-muted-foreground"
                  >
                    View History{" "}
                    <span>
                      <ArrowRight />
                    </span>
                  </Button>
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-5">
            <RecentAppointments
              recentAppointments={
                agentDashboard?.data?.recentAppointments || []
              }
            />
            <RecentOrders
              recentOrders={agentDashboard?.data?.recentOrders || []}
            />
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AgentDetails;
