import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface RevenueTrendChartProps {
  data: { month: string; revenue: number; orders: number }[];
}

const tooltipStyles = {
  backgroundColor: "rgba(27, 15, 20, 0.92)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 215, 170, 0.35)",
  padding: "10px 14px",
  color: "#FDF8F2",
  boxShadow: "0 12px 32px rgba(17, 9, 12, 0.45)",
};

export const RevenueTrendChart = ({ data }: RevenueTrendChartProps) => {
  return (
    <div className="w-full rounded-2xl border border-border/60 bg-card/70 p-0 shadow-card backdrop-blur">
      <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Revenue Trend
          </h3>
          <p className="text-sm text-muted-foreground">
            Monthly performance with correlated order volume
          </p>
        </div>
        <div className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
          FY 2025
        </div>
      </div>
      <div className="h-72 w-full p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ left: 10, right: 10, top: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(255, 215, 170, 0.72)" />
                <stop offset="95%" stopColor="rgba(255, 215, 170, 0.04)" />
              </linearGradient>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgba(174, 126, 255, 0.48)" />
                <stop offset="95%" stopColor="rgba(174, 126, 255, 0.08)" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 215, 170, 0.15)"
              vertical={false}
            />
         <XAxis
  dataKey="month"
  tickLine={false}
  axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
  tick={{ fill: "#374151", fontSize: 12 }}   // gray-700
/>
           <YAxis
  tickFormatter={(value) => `₹${value}L`}
  tickLine={false}
  axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
  tick={{ fill: "#374151", fontSize: 12 }}   // gray-700
/>
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || payload.length === 0) return null;
                const revenue = payload[0]?.value;
                const orders = payload[1]?.value;
                return (
                  <div style={tooltipStyles}>
                    <p className="text-sm font-medium text-gold-light">
                      {label}
                    </p>
                    <div className="mt-2 space-y-1 text-xs">
                      <p>
                        Revenue:{" "}
                        <span className="font-semibold">₹{revenue}L</span>
                      </p>
                      <p>
                        Orders: <span className="font-semibold">{orders}</span>
                      </p>
                    </div>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="rgba(255, 215, 170, 0.9)"
              strokeWidth={2.6}
              fill="url(#revenueGradient)"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="rgba(174, 126, 255, 0.75)"
              strokeWidth={2}
              fill="url(#ordersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
