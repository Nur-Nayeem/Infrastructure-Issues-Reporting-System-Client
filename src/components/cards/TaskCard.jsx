import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div key={task.id} className="p-3 bg-slate-900/50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              task.priority === "high" ? "bg-red-500" : "bg-blue-500"
            }`}
          ></div>
          <span className="text-sm text-slate-400">{task.assignedAt}</span>
        </div>
        {task.priority === "high" && (
          <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-full">
            High Priority
          </span>
        )}
      </div>
      <p className="text-slate-200">{task.title}</p>
    </div>
  );
};

export default TaskCard;
