import React, { useMemo } from "react";
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

const IssuesStatisticsChart = ({ issues = [] }) => {
  const chartData = useMemo(() => {
    const map = {};

    issues.forEach((issue) => {
      const dateSource = issue.assignedAt || issue.createdAt;
      if (!dateSource) return;

      const date = new Date(dateSource).toISOString().split("T")[0]; // YYYY-MM-DD

      if (!map[date]) {
        map[date] = { day: date, assigned: 0, resolved: 0 };
      }

      map[date].assigned += 1;

      if (issue.status === "Resolved") {
        map[date].resolved += 1;
      }
    });

    // Last 7 days
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];

      last7Days.push({
        day: key,
        assigned: map[key]?.assigned || 0,
        resolved: map[key]?.resolved || 0,
      });
    }

    return last7Days;
  }, [issues]);

  return (
    <div className="bg-surface-dark rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">
          Issues Statistics (Last 7 Days)
        </h3>
        <FaChartLine className="text-slate-400" />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} />
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
