import React from "react";

const AssignTaskModal = ({
  staffList,
  showAssignModal,
  setShowAssignModal,
  handleAssignStaff,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      {/* Modal card uses bg-surface-dark and adjusted border */}
      <div className="bg-surface-dark rounded-xl p-6 max-w-md w-full border border-slate-700 shadow-2xl">
        <h3 className="text-xl font-semibold text-white mb-4">Assign Staff</h3>
        <p className="text-slate-300 mb-6">
          Select a staff member to assign to this issue
        </p>

        <select
          // Input background changed to bg-background-dark for contrast
          className="w-full mb-6 px-4 py-3 bg-background-dark rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-primary focus:border-primary/50"
          defaultValue=""
        >
          <option value="" disabled>
            Select Staff Member
          </option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAssignModal(null)}
            // Button border adjusted
            className="flex-1 px-4 py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-background-dark transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => handleAssignStaff(showAssignModal, 1)} // Default to first staff
            // Uses primary variable for action
            className="flex-1 px-4 py-3 bg-primary hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
          >
            Assign Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTaskModal;
