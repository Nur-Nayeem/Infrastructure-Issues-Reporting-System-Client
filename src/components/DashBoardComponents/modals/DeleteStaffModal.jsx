import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteStaffModal = ({
  setShowDeleteModal,
  handleDeleteStaff,
  showDeleteModal,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-dark rounded-xl p-6 max-w-md w-full border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <FaExclamationTriangle className="text-red-400 text-xl" />
          <h3 className="text-xl font-semibold text-slate-100">
            Delete Staff Member
          </h3>
        </div>

        <p className="text-slate-300 mb-6">
          Are you sure you want to delete this staff member? This action cannot
          be undone. All assigned issues will need to be reassigned.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteModal(null)}
            className="flex-1 px-4 py-3 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={() => handleDeleteStaff(showDeleteModal)}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Delete Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStaffModal;
