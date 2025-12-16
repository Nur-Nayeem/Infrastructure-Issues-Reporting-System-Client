import React from "react";
import {
  FaCheckCircle,
  FaEdit,
  FaTimesCircle,
  FaTrash,
  FaUserTie,
} from "react-icons/fa";

const StaffTable = ({
  setShowEditModal,
  filteredStaff,
  setShowDeleteModal,
}) => {
  return (
    <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left p-4 text-slate-400">Staff Member</th>
              <th className="text-left p-4 text-slate-400">Status</th>
              <th className="text-left p-4 text-slate-400">Assigned Issues</th>
              <th className="text-left p-4 text-slate-400">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStaff.map((member) => (
              <tr
                key={member._id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      {member.photoURL ? (
                        <img
                          src={member.photoURL}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserTie className="text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-100">
                        {member.displayName}
                      </div>
                      <div className="text-sm text-slate-400">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {member.status === "active" ? (
                      <FaCheckCircle className="text-green-400" />
                    ) : (
                      <FaTimesCircle className="text-red-400" />
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        member.status === "active"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                </td>

                <td className="p-4 text-xs text-slate-400">
                  {member.assignedIssues || "Not Assigned"}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowEditModal(member)}
                      className="p-2 bg-blue-500/20 text-blue-300 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(member.email)}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffTable;
