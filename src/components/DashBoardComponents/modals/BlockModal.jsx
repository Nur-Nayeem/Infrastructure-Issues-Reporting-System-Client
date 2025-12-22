import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const BlockModal = ({ setShowBlockModal, showBlockModal, toggleUserBlock }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-dark rounded-xl p-6 max-w-md w-full border border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <FaExclamationTriangle className="text-red-400" />
          <h3 className="text-xl font-semibold text-slate-100">
            Block/UnBlocking User
          </h3>
        </div>

        <p className="text-slate-300 mb-4">Are you sure you want to do this?</p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowBlockModal(null);
            }}
            className="flex-1 px-4 py-3 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toggleUserBlock(showBlockModal);
              setShowBlockModal(null);
            }}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;
