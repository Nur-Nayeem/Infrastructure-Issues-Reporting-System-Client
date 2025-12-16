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

export const AdminDashboardPage = () => {
  // Stats data
  const stats = [
    {
      title: "Total Issues",
      value: "1,247",
      icon: <FaClipboardList />,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Resolved",
      value: "892",
      icon: <FaCheckCircle />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Pending",
      value: "187",
      icon: <FaClock />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      title: "Rejected",
      value: "45",
      icon: <FaTimesCircle />,
      color: "bg-red-500/20 text-red-400",
    },
    {
      title: "Total payment received",
      value: "৳45,800",
      icon: <FaDollarSign />,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Active Users",
      value: "1,234",
      icon: <FaUsers />,
      color: "bg-indigo-500/20 text-indigo-400",
    },
  ];

  // Latest issues
  const latestIssues = [
    {
      id: 1,
      title: "Major Road Damage",
      user: "John Doe",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      title: "Water Supply Issue",
      user: "Sarah Smith",
      status: "in-progress",
      priority: "normal",
    },
    {
      id: 3,
      title: "Garbage Collection",
      user: "Mike Johnson",
      status: "pending",
      priority: "high",
    },
  ];

  // Latest payments
  const latestPayments = [
    {
      id: 1,
      user: "Robert Brown",
      type: "Premium Subscription",
      amount: "৳1000",
      status: "completed",
    },
    {
      id: 2,
      user: "Lisa Taylor",
      type: "Issue Boost",
      amount: "৳100",
      status: "completed",
    },
    {
      id: 3,
      user: "David Miller",
      type: "Premium Subscription",
      amount: "৳1000",
      status: "pending",
    },
  ];

  // Latest users
  const latestUsers = [
    {
      id: 1,
      name: "Alex Chen",
      email: "alex@example.com",
      isPremium: true,
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria@example.com",
      isPremium: false,
    },
    {
      id: 3,
      name: "James Wilson",
      email: "james@example.com",
      isPremium: true,
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
        <IssuesOverviewChart />

        {/* payments  */}
        <ReceivedPaymentsChart />
      </div>

      {/* lest data table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* latest issues */}
        <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-100">Latest Issues</h3>
            <Link
              to="/admin/issues"
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
              to="/admin/payments"
              className="text-primary text-sm hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-800/50">
            {latestPayments.map((payment, index) => (
              <PayementCard index={index} payment={payment} />
            ))}
          </div>
        </div>

        {/* latest users */}
        <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-100">Latest Users</h3>
            <Link
              to="/admin/users"
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
