import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import IssuesListTableOfStaff from "../../components/DashBoardComponents/Tables/IssuesListTableOfStaff";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const StaffAssignedIssuesPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const axiosInstance = useAxios();
  const axiosSecureInstance = useAxiosSecure();
  const { user } = useAuth();
  const { data: issues = [], refetch: refetchIssues } = useQuery({
    queryKey: ["issues", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/issues?assignedto=${user?.email}`);
      return res.data.result;
    },
  });
  const updateStatus = async (issueId, newStatus) => {
    await axiosSecureInstance.patch(`/issues/${issueId}/status`, {
      status: newStatus,
      userEmail: user?.email,
    });
    refetchIssues();
  };

  console.log(user);

  const filteredIssues = issues.filter((issue) => {
    if (statusFilter !== "All" && issue.status !== statusFilter) return false;
    if (priorityFilter !== "All" && issue.priority !== priorityFilter)
      return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white font-display">
          Assigned Issues
        </h1>
        <p className="text-slate-400 text-sm">
          Showing {issues?.length} assignments
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
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Low">Low Priority</option>
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
              <option value="In-Progress">In Progress</option>
              <option value="Working">Working</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <IssuesListTableOfStaff
        issues={filteredIssues}
        updateStatus={updateStatus}
      />
    </div>
  );
};
