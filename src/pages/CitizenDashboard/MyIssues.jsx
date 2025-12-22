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
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/Loader";

export const MyIssuesPage = () => {
  const [filtered, setFiltered] = useState("all");
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const axiosSecureInstanse = useAxiosSecure();

  const {
    data: issues = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-issues", user?.email],
    queryFn: async () => {
      const res = await axiosSecureInstanse.get(`/my-issues/${user?.email}`);
      return res.data;
    },
  });

  const filteredIssues = issues.filter((issue) => {
    if (filtered !== "all" && issue.status !== filtered) return false;
    if (search && !issue.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock className="text-yellow-400" />;
      case "In-Progress":
        return <FaCog className="text-blue-400" />;
      case "Resolved":
        return <FaCheckCircle className="text-green-400" />;
      default:
        return <FaTimesCircle className="text-red-400" />;
    }
  };

  if (isLoading) return <LoadingSpinner />;

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
              value={filtered}
              onChange={(e) => setFiltered(e.target.value)}
              className="input-box"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue, index) => (
            <MyIssueCard
              key={index}
              issue={issue}
              getStatusIcon={getStatusIcon}
              refetch={refetch}
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
