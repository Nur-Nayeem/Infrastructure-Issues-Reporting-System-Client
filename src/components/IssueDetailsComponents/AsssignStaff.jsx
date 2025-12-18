import React from "react";
import { GoPeople } from "react-icons/go";

const AsssignStaff = ({ issue }) => {
  return (
    <div className="bg-surface-dark rounded-xl border border-slate-800 p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 font-display flex items-center gap-2">
        <GoPeople className="text-secondary" />
        Assigned Staff
      </h3>
      {issue.assignedStaff ? (
        <div className="flex items-center gap-4">
          {/* <img
            src={issue.assignedStaff.avatar}
            alt="Staff"
            className="w-12 h-12 rounded-full border border-slate-600"
          /> */}
          <div className="w-12 h-12 rounded-full border border-slate-600 text-primary text-2xl justify-center items-center font-bold">
            S
          </div>
          <div>
            <p className="text-slate-200 font-medium">{issue.assignedStaff}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 text-slate-500">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-2">
            <GoPeople className="opacity-50" />
          </div>
          <p>No staff assigned yet.</p>
        </div>
      )}
    </div>
  );
};

export default AsssignStaff;
