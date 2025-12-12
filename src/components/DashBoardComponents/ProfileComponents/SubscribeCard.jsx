import React, { useState } from "react";
import { FaDollarSign } from "react-icons/fa";

export const SubscribeCard = ({ user, setUser }) => {
  const [loading, setLoading] = useState(false);
  const handleSubscribe = async () => {
    setLoading(true);

    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        isPremium: true,
        subscriptionDate: new Date().toISOString(),
        totalPayments: "৳1,000",
      }));
      setLoading(false);
      alert("Successfully subscribed to Premium!");
    }, 1500);
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
