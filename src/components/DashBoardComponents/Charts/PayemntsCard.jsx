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
import { FaDollarSign } from "react-icons/fa";

const ReceivedPaymentsChart = () => {
  const dataChart = [
    { date: "Jan", count: 12000 },
    { date: "Feb", count: 15000 },
    { date: "Mar", count: 18000 },
    { date: "Apr", count: 16500 },
    { date: "May", count: 21000 },
    { date: "Jun", count: 19500 },
    { date: "Jul", count: 23000 },
    { date: "Aug", count: 22000 },
    { date: "Sep", count: 26000 },
    { date: "Oct", count: 28000 },
    { date: "Nov", count: 25000 },
    { date: "Dec", count: 30000 },
  ];

  return (
    <div className="bg-surface-dark rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">
          Received Payments
        </h3>
        <FaDollarSign className="text-slate-400" />
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

export default ReceivedPaymentsChart;
