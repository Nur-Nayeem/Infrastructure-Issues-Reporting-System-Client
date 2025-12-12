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
        return <FaClock className="text-yellow-400" />;
      case "in-progress":
        return <FaCog className="text-blue-400" />;
      case "resolved":
        return <FaCheckCircle className="text-green-400" />;
      default:
        return <FaTimesCircle className="text-red-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-100">My Issues</h1>
        <Link
          to="/dashboard/user/report"
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <FaPlus /> Report New Issue
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-surface-dark rounded-2xl p-5 border border-slate-800 mb-6 shadow-inner">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="relative w-full md:max-w-md mb-3 md:mb-0">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-box"
            />
          </div>

          <div className="relative w-full md:max-w-sm mb-3 md:mb-0">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-box"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <MyIssueCard
              key={issue.id}
              issue={issue}
              getStatusIcon={getStatusIcon}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-surface-dark rounded-2xl border border-slate-800">
            <p className="text-slate-400 mb-4">No issues found</p>
            <Link
              to="/dashboard/user/report"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <FaPlus /> Report Your First Issue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
