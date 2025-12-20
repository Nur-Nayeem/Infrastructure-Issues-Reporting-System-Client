import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaChartLine } from "react-icons/fa";

const IssuesStatisticsChart = () => {
  const data = [
    { month: "Sat", assigned: 40, resolved: 30 },
    { month: "Sun", assigned: 45, resolved: 35 },
    { month: "Mon", assigned: 50, resolved: 42 },
    { month: "Tue", assigned: 48, resolved: 40 },
    { month: "Wed", assigned: 55, resolved: 50 },
    { month: "Thu", assigned: 60, resolved: 54 },
    { month: "Fri", assigned: 65, resolved: 58 },
  ];

  return (
    <div className="bg-surface-dark rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">
          Issues Statistics
        </h3>
        <FaChartLine className="text-slate-400" />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis allowDecimals={false} tick={{ fill: "#94a3b8" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="assigned"
              stroke="#f97316"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssuesStatisticsChart;
