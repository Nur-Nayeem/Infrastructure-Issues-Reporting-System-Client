import React from "react";
import GetStatusIcon from "../../GetStatus/GetStatus";

const IssuesListTableOfStaff = ({ issues, updateStatus }) => {
  return (
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
            {issues.map((issue) => {
              return (
                <tr
                  key={issue._id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-white font-medium">{issue.title}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {issue.category} • {issue.createrAt}
                    </div>
                  </td>
                  <td className="p-4 flex gap-2 items-center">
                    {GetStatusIcon(issue.status)} <span>{issue.status}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-2xl border ${
                        issue.priority === "High"
                          ? "border-red-500/50 text-red-400"
                          : "border-slate-600 text-slate-400"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">
                    {issue.reportedBy}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {issue.status === "Pending" && (
                      <button
                        onClick={() => updateStatus(issue._id, "In-Progress")}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors"
                      >
                        In-Progress
                      </button>
                    )}

                    {issue.status === "In-Progress" && (
                      <button
                        onClick={() => updateStatus(issue._id, "Working")}
                        className="px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200 transition-colors"
                      >
                        Working
                      </button>
                    )}
                    {issue.status === "Working" && (
                      <button
                        onClick={() => updateStatus(issue._id, "Resolved")}
                        className="px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200 transition-colors"
                      >
                        Resolve
                      </button>
                    )}
                    {issue.status === "Resolved" && (
                      <button
                        onClick={() => updateStatus(issue._id, "Closed")}
                        className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
                      >
                        Close
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
  );
};

export default IssuesListTableOfStaff;
