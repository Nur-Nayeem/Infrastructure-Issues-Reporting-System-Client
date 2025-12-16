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
import { FaChartBar } from "react-icons/fa";

const IssuesOverviewChart = () => {
  const dataChart = [
    { date: "Jan", count: 12 },
    { date: "Feb", count: 18 },
    { date: "Mar", count: 25 },
    { date: "Apr", count: 20 },
    { date: "May", count: 30 },
    { date: "Jun", count: 28 },
    { date: "Jul", count: 35 },
    { date: "Aug", count: 32 },
    { date: "Sep", count: 40 },
    { date: "Oct", count: 45 },
    { date: "Nov", count: 38 },
    { date: "Dec", count: 50 },
  ];

  return (
    <div className="bg-surface-dark rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">
          Issues Overview
        </h3>
        <FaChartBar className="text-slate-400" />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataChart}
            margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#e2e8f0" }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IssuesOverviewChart;
