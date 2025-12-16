import React from "react";
import { FaBan, FaCheckCircle, FaCrown, FaEye, FaUser } from "react-icons/fa";

const UserTable = ({ users, setShowBlockModal }) => {
  return (
    <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left p-4 text-slate-400 font-medium">User</th>
              <th className="text-left p-4 text-slate-400 font-medium">
                Subscription
              </th>
              <th className="text-left p-4 text-slate-400 font-medium">
                Status
              </th>
              <th className="text-left p-4 text-slate-400 font-medium">
                Issues
              </th>
              <th className="text-left p-4 text-slate-400 font-medium">
                Payments
              </th>
              <th className="text-left p-4 text-slate-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                      <FaUser className="text-slate-300" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-100">
                        {user.displayName}
                      </div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {user.isPremium ? (
                      <FaCrown className="text-accent" />
                    ) : (
                      <FaUser className="text-slate-400" />
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.isPremium
                          ? "bg-accent/20 text-accent"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {user.isPremium ? "Premium" : "Free"}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {!user.isBlocked ? (
                      <FaCheckCircle className="text-green-400" />
                    ) : (
                      <FaBan className="text-red-400" />
                    )}
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        !user.isBlocked
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-slate-100">{user.issuesReported}</div>
                  <div className="text-xs text-slate-400">reported</div>
                </td>
                <td className="p-4">
                  <div className="text-slate-100">{user.payments}</div>
                  <div className="text-xs text-slate-400">total</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-blue-400 hover:text-blue-300">
                      <FaEye />
                    </button>
                    <button
                      onClick={() => {
                        setShowBlockModal(user.email);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        !user.isBlocked
                          ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                          : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                      }`}
                    >
                      {!user.isBlocked ? "Block" : "Unblock"}
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

export default UserTable;
