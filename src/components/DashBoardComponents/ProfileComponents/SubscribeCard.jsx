import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

export const SubscribeCard = ({ user, refetchUser }) => {
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const handleSubscribe = async () => {
    try {
      setLoading(true);

      await axiosInstance.patch(`/users/${user?._id}/subscribe`);

      toast.success("Subscription activated");
      refetchUser?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4 p-4 bg-background-dark/50 rounded-xl text-center">
        <div className="text-2xl font-bold text-slate-100 mb-1">৳1000</div>
        <p className="text-slate-400 text-sm">One-time payment</p>
      </div>
      <button
        onClick={handleSubscribe}
        disabled={loading || user.isBlocked}
        className="btn-primary w-full py-3 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            Processing...
          </span>
        ) : (
          <>
            <FaDollarSign />
            Subscribe Now
          </>
        )}
      </button>
    </>
  );
};

export const PremiumUserCard = ({ user }) => {
  return (
    <div className="text-center p-3 bg-green-500/10 rounded-lg">
      <p className="text-green-400 text-sm">
        Premium since{" "}
        {user.subscriptionDate
          ? new Date(user.subscriptionDate).toLocaleDateString()
          : "N/A"}
      </p>
    </div>
  );
};
