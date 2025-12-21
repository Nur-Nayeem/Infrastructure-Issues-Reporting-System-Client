import React from "react";
import { FaClipboardList, FaCheckCircle, FaTasks } from "react-icons/fa";
import { Link } from "react-router";
import { StatCard } from "../../components/DashBoardComponents/StatCard/StatCard";
import { MdOutlineToday } from "react-icons/md";
import IssuesStatisticsChart from "../../components/DashBoardComponents/Charts/IssuesStatisticsChart";
import TaskCard from "../../components/cards/TaskCard";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const StaffDashboardPage = () => {
  const { user } = useAuth();
  const axiosSecureInstance = useAxiosSecure();

  const { data: issues = [] } = useQuery({
    queryKey: ["issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(
        `/issues?assignedto=${user?.email}`
      );
      return res.data.result;
    },
  });

  //resolved tasks:

  const resolvedTask = issues.filter((issue) => {
    if (issue.status === "Resolved" || issue.status === "Closed") return true;
    return false;
  });

  // today
  const today = new Date().toISOString().split("T")[0];

  // Filter today's tasks
  const todaysTasks = issues.filter((issue) => {
    if (!issue.assignedAt) return false;
    if (issue.status === "Resolved" || issue.status === "Closed") return false;
    const assignedDate = new Date(issue.assignedAt).toISOString().split("T")[0];

    return assignedDate === today;
  });

  const stats = [
    {
      title: "Assigned Issues",
      value: issues.length,
      icon: <FaClipboardList />,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Total Resolved",
      value: resolvedTask.length,
      icon: <FaCheckCircle />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Today's Task",
      value: todaysTasks.length,
      icon: <MdOutlineToday />,
      color: "bg-amber-500/20 text-amber-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
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
        <IssuesStatisticsChart issues={issues} />

        {/* Today's Tasks */}
        <div className="bg-surface-dark rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-100">
              Today's Tasks
            </h3>
            <FaTasks className="text-slate-400" />
          </div>
          {todaysTasks.length ? (
            <>
              <div className="space-y-4">
                {todaysTasks.map((task, index) => (
                  <TaskCard key={index} task={task} />
                ))}
              </div>
              <Link
                to={"/dashboard/staff/assigned-issues"}
                className="w-full flex items-center justify-center mt-4 py-2 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
              >
                View All Tasks
              </Link>
            </>
          ) : (
            <div className="text-center flex justify-center items-center h-[70%]">
              <h2>There is no more task today</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
