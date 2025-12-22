import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "../../pages/Payments/Invoice";
const PaymentHistoryCard = ({ payments = [] }) => {
  return (
    <div className="bg-surface-dark rounded-2xl border border-slate-800 p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-slate-100">Payment History</h4>
      </div>

      {payments.length === 0 ? (
        <p className="text-sm text-slate-400">No payments found</p>
      ) : (
        <div className="space-y-3 text-sm text-slate-300">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="text-slate-100">৳{payment.amount}</p>
                <p className="text-xs text-slate-400">
                  {payment.paymentType === "ISSUE_BOOST"
                    ? "Issue Boost"
                    : "Subscription"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p
                  className={`text-xs ${
                    payment.status === "SUCCESS"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {payment.status}
                </p>
                <PDFDownloadLink
                  document={
                    <InvoiceDocument
                      payment={{
                        ...payment,
                        userName: payment.userName,
                        userEmail: payment.userEmail,
                      }}
                    />
                  }
                  fileName={`invoice-${payment.paymentId}.pdf`}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  {({ loading }) => (loading ? "Loading..." : "Download PDF")}
                </PDFDownloadLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryCard;
