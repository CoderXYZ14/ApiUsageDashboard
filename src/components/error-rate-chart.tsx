"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart";

interface DailyUsage {
  date: string;
  total: number;
  successful: number;
  failed: number;
}

interface ErrorRateChartProps {
  data: DailyUsage[];
}

export default function ErrorRateChart({ data }: ErrorRateChartProps) {
  // Calculate error rate and format date
  const formattedData = data.map((item) => {
    const errorRate = (item.failed / item.total) * 100;
    return {
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      errorRate: Number.parseFloat(errorRate.toFixed(2)),
    };
  });

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={false}
            stroke="#94a3b8"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, "dataMax + 2"]}
            tickFormatter={(value) => `${value}%`}
            stroke="#94a3b8"
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Error Rate"]}
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            itemStyle={{ color: "var(--foreground)" }}
            labelStyle={{ color: "var(--foreground)", fontWeight: "bold" }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Line
            type="monotone"
            dataKey="errorRate"
            stroke="#ef4444"
            activeDot={{ r: 8, strokeWidth: 0, fill: "#ef4444" }}
            name="Error Rate"
            strokeWidth={3}
            dot={{ strokeWidth: 0, fill: "#ef4444", r: 4 }}
          />
          {/* Add a reference line at 10% */}
          <Line
            type="monotone"
            dataKey={() => 10}
            stroke="#6b7280"
            strokeDasharray="5 5"
            name="Threshold (10%)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
