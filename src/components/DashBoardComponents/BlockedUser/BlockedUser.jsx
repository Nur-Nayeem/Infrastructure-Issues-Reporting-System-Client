import React from "react";
import { FaTimes } from "react-icons/fa";

const BlockedUser = () => {
  return (
    <div className="bg-red-900/40 border border-red-600/50 rounded-lg p-4 mb-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="text-red-400 mt-0.5">
          <FaTimes size={24} />
        </div>
        <div>
          <h3 className="font-bold text-red-300 text-lg">
            Account Access Restricted
          </h3>
          <p className="text-sm text-red-200 mt-1">
            Your account has been blocked by the system administrator due to
            policy violations. Please contact support immediately, quoting your
            email, for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlockedUser;
