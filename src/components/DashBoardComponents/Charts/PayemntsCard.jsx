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
import { FaDollarSign } from "react-icons/fa";

const ReceivedPaymentsChart = ({ payments = [] }) => {
  const chartData = useMemo(() => {
    const map = {};

    payments.forEach((payment) => {
      if (!payment.createdAt || !payment.amount) return;

      const date = new Date(payment.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD

      if (!map[date]) {
        map[date] = { date, amount: 0 };
      }

      map[date].amount += Number(payment.amount);
    });

    // Generate last 7 days
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];

      last7Days.push({
        date: key,
        amount: map[key]?.amount || 0,
      });
    }

    return last7Days;
  }, [payments]);

  return (
    <div className="bg-surface-dark rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">
          Received Payments (Last 7 Days)
        </h3>
        <FaDollarSign className="text-slate-400" />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
            <Tooltip
              formatter={(value) => [`৳${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#e2e8f0" }}
            />
            <Line
              type="monotone"
              dataKey="amount"
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
