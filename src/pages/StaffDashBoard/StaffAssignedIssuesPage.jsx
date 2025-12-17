import React, { useState } from "react";
import {
  FaFilter,
  FaClock,
  FaCog,
  FaCheckCircle,
  FaChevronDown,
} from "react-icons/fa";

export const StaffAssignedIssuesPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Road Pothole on Main Street",
      category: "Infrastructure",
      status: "Pending",
      date: "2024-01-15",
      priority: "High",
      boosted: true,
      reporter: "John Doe",
    },
    {
      id: 2,
      title: "Street Light Not Working",
      category: "Electricity",
      status: "In-Progress",
      date: "2024-01-12",
      priority: "Low",
      boosted: false,
      reporter: "Mike Smith",
    },
    {
      id: 3,
      title: "Garbage Collection Delay",
      category: "Sanitation",
      status: "Working",
      date: "2024-01-10",
      priority: "Low",
      boosted: false,
      reporter: "Sarah Wilson",
    },
    {
      id: 4,
      title: "Water Leakage",
      category: "Water",
      status: "Resolved",
      date: "2024-01-08",
      priority: "High",
      boosted: true,
      reporter: "Robert Brown",
    },
  ]);

  const getStatusBadge = (status) => {
    const config = {
      pending: { color: "bg-yellow-500/20 text-yellow-300", icon: <FaClock /> },
      "in-progress": {
        color: "bg-blue-500/20 text-blue-300",
        icon: <FaCog className="animate-spin-slow" />,
      },
      working: { color: "bg-orange-500/20 text-orange-300", icon: <FaCog /> },
      resolved: {
        color: "bg-green-500/20 text-green-300",
        icon: <FaCheckCircle />,
      },
      closed: {
        color: "bg-slate-600/20 text-slate-400",
        icon: <FaCheckCircle />,
      },
    };
    const { color, icon } = config[status] || config.pending;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${color}`}
      >
        {icon}
        {status.replace("-", " ").toUpperCase()}
      </span>
    );
  };

  const filteredIssues = issues
    .filter((issue) => {
      const matchStatus =
        statusFilter === "all" || issue.status === statusFilter;
      const matchPriority =
        priorityFilter === "all" || issue.priority === priorityFilter;
      return matchStatus && matchPriority;
    })
    .sort((a, b) => (a.boosted === b.boosted ? 0 : a.boosted ? -1 : 1));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Assigned Issues
        </h1>
        <p className="text-slate-400 text-sm">
          Showing {filteredIssues.length} assignments
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-dark rounded-xl p-4 border border-slate-700 shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background-dark border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-primary outline-none appearance-none"
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Low">Normal Priority</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px] relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background-dark border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-primary outline-none appearance-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In-progress">In Progress</option>
              <option value="Working">Working</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-surface-dark rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background-dark/50 border-b border-slate-700">
              <tr>
                <th className="p-4 text-slate-400 font-semibold text-sm">
                  Issue Details
                </th>
                <th className="p-4 text-slate-400 font-semibold text-sm">
                  Status
                </th>
                <th className="p-4 text-slate-400 font-semibold text-sm">
                  Priority
                </th>
                <th className="p-4 text-slate-400 font-semibold text-sm">
                  Reporter
                </th>
                <th className="p-4 text-slate-400 font-semibold text-sm text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredIssues.map((issue) => {
                return (
                  <tr
                    key={issue.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4">
                      <div className="text-white font-medium">
                        {issue.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {issue.category} • {issue.date}
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(issue.status)}</td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${
                          issue.status === "High"
                            ? "border-red-500/50 text-red-400"
                            : "border-slate-600 text-slate-400"
                        }`}
                      >
                        {issue.priority}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 text-sm">
                      {issue.reporter}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {issue.status === "Pending" && (
                        <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors">
                          In-Progress
                        </button>
                      )}

                      {issue.status === "In-Progress" && (
                        <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 transition-colors">
                          Working
                        </button>
                      )}
                      {issue.status === "Working" && (
                        <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 transition-colors">
                          Resolved
                        </button>
                      )}
                      {issue.status === "Resolved" && (
                        <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors">
                          Closed
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
