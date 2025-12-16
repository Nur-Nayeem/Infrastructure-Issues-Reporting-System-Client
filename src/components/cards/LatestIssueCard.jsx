import React from "react";

const LatestIssueCard = ({ issue }) => {
  return (
    <div key={issue.id} className="p-4 hover:bg-slate-800/30">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-medium text-slate-100 mb-1">{issue.title}</p>
          <p className="text-sm text-slate-400">{issue.user}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`px-2 py-1 rounded text-xs ${
              issue.priority === "high"
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
            issue.status === "pending"
              ? "bg-yellow-500/20 text-yellow-300"
              : issue.status === "in-progress"
              ? "bg-blue-500/20 text-blue-300"
              : "bg-green-500/20 text-green-300"
          }`}
        >
          {issue.status}
        </span>
        <button className="text-sm text-primary hover:underline">
          Assign Staff
        </button>
      </div>
    </div>
  );
};

export default LatestIssueCard;
