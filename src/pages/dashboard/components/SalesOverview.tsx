"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetSalesOverview } from "../hooks/useGetSalesChart";

const SalesOverviewChart = () => {

  const { data, isLoading, error}=useGetSalesOverview();

  const chartData =
  data?.labels?.map((label: string, index: number) => ({
    name: label,
    thisWeek: data?.thisWeek?.[index],
    lastWeek: data?.lastWeek?.[index],
  })) || [];

  return (
    <Card className="w-full rounded-3xl border border-zinc-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-semibold text-zinc-900">
            Sales Overview
          </CardTitle>

          <p className="mt-1 text-sm text-zinc-500">
            Track your sales performance over time.
          </p>
        </div>

        <div className="flex items-center gap-6 pt-1">
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-6 bg-primary" />

            <span className="text-sm text-zinc-500">
              This Week
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-[2px] w-6 border-t-2 border-dashed border-gold" />

            <span className="text-sm text-zinc-400">
              Last Week
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[320px] pt-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid
              vertical={false}
              stroke="#F1F1F1"
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 13,
              }}
            />

            <YAxis
              tickFormatter={(value) =>
                `${value / 1000}k`
              }
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 13,
              }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="lastWeek"
              stroke="#ebbd88"
              strokeWidth={2}
              strokeDasharray="6 6"
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="thisWeek"
              stroke="#3B1F29"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default SalesOverviewChart;