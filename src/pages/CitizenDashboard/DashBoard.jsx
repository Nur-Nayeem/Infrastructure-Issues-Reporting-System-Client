import React from "react";
import {
  FaClipboardList,
  FaClock,
  FaCog,
  FaCheckCircle,
  FaDollarSign,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router";
import { StatCard } from "../../components/DashBoardComponents/StatCard/StatCard";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const DashboardPage = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: ["issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/issues?reportedby=${user?.email}`
      );
      return res.data.result;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecureInstance.get("/payments/user");
      return res.data;
    },
  });

  const resolvedTask = issues.filter((issue) => {
    if (issue.status === "Resolved") return true;
    return false;
  });
  const pendingTask = issues.filter((issue) => {
    if (issue.status === "Pending") return true;
    return false;
  });
  const inProgressTask = issues.filter((issue) => {
    if (issue.status === "In-Progress") return true;
    return false;
  });

  const totalPayments = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  const stats = [
    {
      title: "Total Issues",
      value: issues?.length,
      icon: <FaClipboardList />,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Pending",
      value: pendingTask.length,
      icon: <FaClock />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      title: "In Progress",
      value: inProgressTask.length,
      icon: <FaCog />,
      color: "bg-orange-500/20 text-orange-400",
    },
    {
      title: "Resolved",
      value: resolvedTask.length,
      icon: <FaCheckCircle />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Total Payments",
      value: `৳${totalPayments}`,
      icon: <FaDollarSign />,
      color: "bg-purple-500/20 text-purple-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-slate-100">
          Dashboard Overview
        </h1>
        <Link
          to="/dashboard/user/report"
          className="btn-primary inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg shadow hover:bg-primary/80 transition"
        >
          <FaPlus /> Report New Issue
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
};
