import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const RejectIssueModal = ({
  setShowRejectModal,
  handleRejectIssue,
  showRejectModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-dark rounded-xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <FaTimesCircle className="text-red-400" />
          <h3 className="text-xl font-semibold text-white">Reject Issue</h3>
        </div>

        <p className="text-slate-300 mb-6">
          Are you sure you want to reject this issue? This action cannot be
          undone.
        </p>

        <div className="mb-6">
          <label className="block text-sm text-slate-400 mb-2">
            Reason for rejection (optional)
          </label>
          <textarea
            className="input-box"
            rows={3}
            placeholder="Provide reason for rejection..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowRejectModal(null)}
            className="flex-1 px-4 py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-background-dark transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleRejectIssue(showRejectModal);
              setShowRejectModal(null);
            }}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
          >
            Reject Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectIssueModal;
