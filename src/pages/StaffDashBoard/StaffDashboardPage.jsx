import React from "react";
import {
  FaClipboardList,
  FaCheckCircle,
  FaChartBar,
  FaTasks,
} from "react-icons/fa";
import { Link } from "react-router";
import { StatCard } from "../../components/DashBoardComponents/StatCard/StatCard";
import { MdOutlineToday } from "react-icons/md";
import IssuesStatisticsChart from "../../components/DashBoardComponents/Charts/IssuesStatisticsChart";
import TaskCard from "../../components/cards/TaskCard";

export const StaffDashboardPage = () => {
  // Mock staff stats
  const stats = [
    {
      title: "Assigned Issues",
      value: "8",
      icon: <FaClipboardList />,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Total Resolved",
      value: "24",
      icon: <FaCheckCircle />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Today’s Task",
      value: "2",
      icon: <MdOutlineToday />,
      color: "bg-amber-500/20 text-amber-400",
    },
  ];

  const todaysTasks = [
    {
      id: 1,
      title: "Inspect Main Street pothole",
      assignedAt: "10:00 AM",
      priority: "high",
    },
    {
      id: 2,
      title: "Review garbage collection route",
      assignedAt: "2:00 PM",
      priority: "normal",
    },
    {
      id: 3,
      title: "Update progress on street lights",
      assignedAt: "4:00 PM",
      priority: "normal",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Staff Dashboard</h1>
        <div className="text-sm text-slate-400">
          Last updated: Today, 9:30 AM
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Chart */}
        <IssuesStatisticsChart />

        {/* Today's Tasks */}
        <div className="bg-surface-dark rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-100">
              Today's Tasks
            </h3>
            <FaTasks className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {todaysTasks.map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};
