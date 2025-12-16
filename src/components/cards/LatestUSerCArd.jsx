import React from "react";

const LatestUSerCArd = ({ user }) => {
  return (
    <div className="p-4 hover:bg-slate-800/30 flex justify-between">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
          <span className="text-slate-300">{user.name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium text-slate-100">{user.name}</p>
          <p className="text-sm text-slate-400">{user.email}</p>
        </div>
      </div>
      <span
        className={`h-max px-2 py-1 rounded text-xs ${
          user.isPremium
            ? "bg-accent/20 text-accent"
            : "bg-slate-700 text-slate-300"
        }`}
      >
        {user.isPremium ? "Premium" : "Free"}
      </span>
    </div>
  );
};

export default LatestUSerCArd;
