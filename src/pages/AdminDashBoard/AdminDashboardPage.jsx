import React from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router";
import { StatCard } from "../../components/DashBoardComponents/StatCard/StatCard";
import ReceivedPaymentsChart from "../../components/DashBoardComponents/Charts/PayemntsCard";
import IssuesOverviewChart from "../../components/DashBoardComponents/Charts/IssuesChartOverview";
import LatestUSerCArd from "../../components/cards/LatestUSerCArd";
import PayementCard from "../../components/cards/PayementCard";
import LatestIssueCard from "../../components/cards/LatestIssueCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const AdminDashboardPage = () => {
  const axiosSecureInstance = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/issues`);
      return res.data.result;
    },
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users", "active", "citizen"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/users?role=citizen`);
      return res.data;
    },
  });

  const { data: staff = [] } = useQuery({
    queryKey: ["users", "active", "staff"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/users?status=active&role=staff`
      );
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/payments`);
      return res.data;
    },
  });

  const latestIssues = [...issues]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const latestUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const latestPayments = [...payments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const resolvedTask = issues.filter((issue) => {
    if (issue.status === "Resolved") return true;
    return false;
  });
  const pendingTask = issues.filter((issue) => {
    if (issue.status === "Pending") return true;
    return false;
  });
  const RejectedTask = issues.filter((issue) => {
    if (issue.status === "Rejected") return true;
    return false;
  });

  const totalReceivedPayments = payments.reduce(
    (sum, payment) => sum + Number(payment.amount || 0),
    0
  );

  // Stats data
  const stats = [
    {
      title: "Total Issues",
      value: issues?.length,
      icon: <FaClipboardList />,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Resolved",
      value: resolvedTask.length,
      icon: <FaCheckCircle />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Pending",
      value: pendingTask.length,
      icon: <FaClock />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      title: "Rejected",
      value: RejectedTask.length,
      icon: <FaTimesCircle />,
      color: "bg-red-500/20 text-red-400",
    },
    {
      title: "Total payment received",
      value: totalReceivedPayments,
      icon: <FaDollarSign />,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Active Users",
      value: users?.length,
      icon: <FaUsers />,
      color: "bg-indigo-500/20 text-indigo-400",
    },
    {
      title: "Active Staff",
      value: staff?.length,
      icon: <FaUsers />,
      color: "bg-indigo-500/20 text-indigo-400",
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-100">
            Admin Dashboard
          </h1>
          <p className="text-slate-400">Overview of the entire system</p>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* charts and overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
        {/* issuse */}
        <IssuesOverviewChart issues={issues} />

        {/* payments  */}
        <ReceivedPaymentsChart payments={payments} />
      </div>

      {/* lest data table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* latest issues */}
        <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-100">Latest Issues</h3>
            <Link
              to="/dashboard/admin/issues"
              className="text-primary text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-800/50">
            {latestIssues.map((issue, index) => (
              <LatestIssueCard key={index} issue={issue} />
            ))}
          </div>
        </div>

        {/* latest payments */}
        <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between">
            <h3 className="font-semibold text-slate-100">Latest Payments</h3>
            <Link
              to="/dashboard/admin/payments"
              className="text-primary text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-800/50">
            {latestPayments.map((payment, index) => (
              <PayementCard key={index} payment={payment} />
            ))}
          </div>
        </div>

        {/* latest users */}
        <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-100">Latest Users</h3>
            <Link
              to="/dashboard/admin/manage-users"
              className="text-primary text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-800/50">
            {latestUsers.map((user, index) => (
              <LatestUSerCArd key={index} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
