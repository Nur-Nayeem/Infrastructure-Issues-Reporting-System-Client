import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

export const UpgradeNotice = ({ user }) => {
  const axiosSecureInstance = useAxiosSecure();
  const handleSubscribe = async () => {
    try {
      const res = await axiosSecureInstance.post("/subscriptions/checkout", {
        userId: user._id,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      toast.error("Failed to start payment", err);
    }
  };
  return (
    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <FaExclamationTriangle className="text-yellow-400" />
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-400">Free Limit Reached</h3>
          <p className="text-sm text-yellow-300 mb-2">
            You have reached the maximum of 3 free issues.
          </p>
          <button
            onClick={handleSubscribe}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
};
