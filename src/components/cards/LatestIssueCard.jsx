import React from "react";

const LatestIssueCard = ({ issue }) => {
  return (
    <div className="p-4 hover:bg-slate-800/30">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-medium text-slate-100 mb-1">{issue.title}</p>
          <p className="text-sm text-slate-400">{issue.reportedby}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`px-2 py-1 rounded text-xs ${
              issue.priority === "High"
                ? "bg-red-500/20 text-red-300"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {issue.priority}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded text-xs ${
            issue.status === "Pending"
              ? "bg-yellow-500/20 text-yellow-300"
              : issue.status === "In-Progress"
                ? "bg-blue-500/20 text-blue-300"
                : "bg-green-500/20 text-green-300"
          }`}
        >
          {issue.status}
        </span>
        <span className="text-sm">{issue.createdAt.split("T")[0]}</span>
      </div>
    </div>
  );
};

export default LatestIssueCard;
