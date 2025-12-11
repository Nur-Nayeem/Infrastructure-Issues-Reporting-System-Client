import React, { useState } from "react";
import {
  FaFilter,
  FaSearch,
  FaClock,
  FaCog,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router";
import MyIssueCard from "../../components/DashBoardComponents/myIssueCard/MyIssueCard";

export const MyIssuesPage = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Mock issues data
  const issues = [
    {
      id: 1,
      title: "Road Pothole on Main Street",
      category: "Infrastructure",
      status: "pending",
      date: "2024-01-15",
      priority: "normal",
    },
    {
      id: 2,
      title: "Garbage Collection Delay",
      category: "Sanitation",
      status: "resolved",
      date: "2024-01-10",
      priority: "high",
    },
    {
      id: 3,
      title: "Street Light Not Working",
      category: "Electricity",
      status: "in-progress",
      date: "2024-01-12",
      priority: "normal",
    },
  ];

  const filteredIssues = issues.filter((issue) => {
    if (filter !== "all" && issue.status !== filter) return false;
    if (search && !issue.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-500" />;
      case "in-progress":
        return <FaCog className="text-blue-500" />;
      case "resolved":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaTimesCircle className="text-red-500" />;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-100">My Issues</h1>
        <Link
          to="/dashboard/user/report"
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <FaPlus /> Report New Issue
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface-dark rounded-xl p-4 border border-slate-800 mb-6">
        <div className="flex justify-between items-center">
          <div className="relative max-w-md w-full">
            <FaSearch className="absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-background-dark rounded-lg border border-slate-700 text-slate-100"
            />
          </div>
          <div className="flex items-center gap-4 max-w-md w-full">
            <FaFilter className="text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 bg-background-dark border border-slate-700 rounded-lg px-3 py-2 text-slate-100 "
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <MyIssueCard issue={issue} getStatusIcon={getStatusIcon} />
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">No issues found</div>
          <Link to="/dashboard/report" className="btn-primary">
            Report Your First Issue
          </Link>
        </div>
      )}
    </div>
  );
};
