"use client";

import {
  BadgeDollarSign,
  CalendarDays,
  GitBranch,
  RefreshCcw,
  WandSparkles,
} from "lucide-react";
import { useGetCommissionSummary } from "../hooks/useGetCommissionSummary";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CommissionSummary = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCommissionSummary();

  const TotalPayment = data?.thisMonth + data?.lastMonth;
  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">
            Commission Summary
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Overview of commissions.
          </p>
        </div>
        <Button  variant="link" onClick={() => navigate("/commissions")}>
          View All
        </Button>
      </div>

      {/* This Week */}
      <div className="flex items-center justify-between py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <GitBranch className="w-4 h-4 text-slate-400" />

          <span className="text-sm font-medium text-slate-600">This Week</span>
        </div>

        <p className="text-sm font-bold text-slate-800">
          {data?.thisWeek ? `₹${data.thisWeek}` : "₹0"}
        </p>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <WandSparkles className="w-4 h-4 text-slate-400" />

          <span className="text-sm font-medium text-slate-600">Last Week</span>
        </div>

        <p className="text-sm font-bold text-slate-800">
          {data?.lastWeek ? `₹${data.lastWeek}` : "₹0"}
        </p>
      </div>

      <div className="flex items-center justify-between py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-4 h-4 text-slate-400" />

          <span className="text-sm font-medium text-slate-600">This Month</span>
        </div>

        <p className="text-sm font-bold text-slate-800">
          {data?.thisMonth ? `₹${data.thisMonth}` : "₹0"}
        </p>
      </div>
      <div className="flex items-center justify-between py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <RefreshCcw className="w-4 h-4 text-slate-400" />

          <span className="text-sm font-medium text-slate-600">Last Month</span>
        </div>

        <p className="text-sm font-bold text-slate-800">
          {data?.lastMonth ? `₹${data.lastMonth}` : "₹0"}
        </p>
      </div>

      <div className="mt-5 bg-emerald-50 rounded-2xl px-4 py-4 flex items-center justify-between border border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 flex items-center justify-center">
            <BadgeDollarSign className="w-4 h-4 text-emerald-600" />
          </div>

          <span className="font-semibold text-slate-900">Total Payout</span>
        </div>

        <p className="text-xl font-bold text-slate-900">
          {TotalPayment ? `₹${TotalPayment}` : "₹0"}
        </p>
      </div>
    </div>
  );
}

export default CommissionSummary;
