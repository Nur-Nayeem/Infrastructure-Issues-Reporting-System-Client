import React from "react";

const PayementCard = ({ payment }) => {
  return (
    <div className="p-4 hover:bg-slate-800/30">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-medium text-slate-100 mb-1">
            {payment.paymentType}
          </p>
          <p className="text-sm text-slate-400">{payment.userId}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-slate-100">{payment.amount}</p>
          <p
            className={`text-xs ${
              payment.status === "SUCCESS"
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {payment.status}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button className="text-xs text-slate-400 hover:text-slate-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PayementCard;
