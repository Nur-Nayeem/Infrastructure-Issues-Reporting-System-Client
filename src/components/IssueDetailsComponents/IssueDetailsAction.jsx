import React from "react";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { handleBoostIssue } from "../../lib";
const IssueDetailsAction = ({ issue, isOwner, isPending, handleDelete }) => {
  return (
    <div className="bg-surface-dark rounded-xl border border-slate-800 p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 font-display">
        Actions
      </h3>

      <div className="space-y-3">
        {issue.priority === "Low" && issue.status !== "Resolved" && (
          <button
            onClick={handleBoostIssue}
            className="w-full py-3 px-4 bg-linear-to-r from-accent to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <BsLightningCharge />
            Boost Priority (100tk)
          </button>
        )}

        {/* Edit/Delete */}
        {isOwner && isPending && (
          <>
            <button className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-700 transition-colors flex items-center justify-center gap-2">
              <MdOutlineModeEdit />
              Edit Issue
            </button>
            <button
              onClick={handleDelete}
              className="w-full py-2.5 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RiDeleteBin6Line />
              Delete Issue
            </button>
          </>
        )}

        {/* Status Display if no actions available */}
        {!isPending && (
          <div className="text-center py-4 text-slate-500 text-sm">
            No further actions available for this issue.
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueDetailsAction;
