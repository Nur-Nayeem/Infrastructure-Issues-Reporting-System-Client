import React from "react";
import GetStatusIcon from "../GetStatus/GetStatus";

const TaskCard = ({ task }) => {
  return (
    <div className="p-3 bg-slate-900/50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {task.priority === "High" ? (
            <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-full">
              High
            </span>
          ) : (
            <span className="px-2 py-1 text-xs bg-slate-600 text-slate-300 rounded-full">
              Low
            </span>
          )}
        </div>
        <span className="flex items-center gap-2">
          {GetStatusIcon(task.status)} <span>{task.status}</span>
        </span>
      </div>
      <div className="flex justify-between ">
        <p className="text-slate-200">{task.title}</p>
        <span className="text-sm text-slate-400">
          {task.assignedAt.split("T")[1].split(".")[0]}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
