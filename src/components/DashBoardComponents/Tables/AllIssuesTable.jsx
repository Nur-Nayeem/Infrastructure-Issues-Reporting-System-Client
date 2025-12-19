import React from "react";
import { FaEye, FaFire, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router";

const AllIssuesTable = ({
  filteredIssues,
  getStatusIcon,
  setShowAssignModal,
  setShowRejectModal,
  setSelectedIssue,
}) => {
  return (
    <div className="bg-surface-dark rounded-xl border border-slate-700 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {/* Border color adjusted */}
            <tr className="border-b border-slate-700">
              {/* Header text color adjusted */}
              <th className="text-left p-4 text-slate-300 font-medium">
                Issue Title
              </th>
              <th className="text-left p-4 text-slate-300 font-medium">
                Category
              </th>
              <th className="text-left p-4 text-slate-300 font-medium">
                Status
              </th>
              <th className="text-left p-4 text-slate-300 font-medium">
                Priority
              </th>
              <th className="text-left p-4 text-slate-300 font-medium">
                Assigned Staff
              </th>
              <th className="text-left p-4 text-slate-300 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue) => (
              <tr
                key={issue._id}
                className="border-b border-slate-800/50 hover:bg-background-dark/50 transition-colors"
              >
                <td className="p-4">
                  <div className="font-medium text-white">{issue.title}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {issue.createdAt}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-slate-300">{issue.category}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(issue.status)}
                    <span className="text-slate-300 capitalize">
                      {issue.status}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {issue.boosted && <FaFire className="text-orange-500" />}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        issue.priority === "High"
                          ? "bg-red-500/20 text-red-300 font-semibold"
                          : "bg-slate-700/50 text-slate-300"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  {issue.assignedTo ? (
                    <div className="text-slate-200 font-medium">
                      {issue.assignedTo}
                    </div>
                  ) : (
                    <span className="text-slate-500 italic">Not assigned</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {!issue.assignedTo && issue.status === "Pending" && (
                      <button
                        onClick={() => {
                          setShowAssignModal(issue._id);
                          setSelectedIssue(issue._id);
                        }}
                        className="px-3 py-1.5 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors text-sm flex items-center gap-2 font-medium"
                      >
                        <FaUserPlus className="w-3 h-3" />
                        Assign
                      </button>
                    )}
                    {issue.status === "Pending" && (
                      <button
                        onClick={() => setShowRejectModal(issue._id)}
                        className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                      >
                        Reject
                      </button>
                    )}
                    <Link
                      to={`/all-issues/${issue._id}`}
                      className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-background-dark/50 transition-colors"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">No issues found</div>
        </div>
      )}
    </div>
  );
};

export default AllIssuesTable;
