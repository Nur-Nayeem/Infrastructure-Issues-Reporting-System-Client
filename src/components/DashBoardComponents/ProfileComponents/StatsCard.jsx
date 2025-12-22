import React from "react";

const StatsCard = ({ currentUser, user }) => {
  return (
    <div className="bg-surface-dark rounded-2xl border border-slate-800 p-6 shadow-lg">
      <h4 className="font-semibold text-slate-100 mb-4">Account Info</h4>
      <div className="space-y-3 text-sm text-slate-300">
        <div className="flex justify-between">
          <span>Status</span>
          <span className={user.isBlocked ? "text-red-400" : "text-green-400"}>
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Joined</span>
          <span className="text-slate-100">
            {new Date(currentUser.createdAt).toLocaleString("default", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
