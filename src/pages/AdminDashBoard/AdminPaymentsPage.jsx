import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminPaymentsPage = () => {
  const axiosSecureInstance = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get(`/payments`);
      return res.data;
    },
  });
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  // Filter payments based on selected status and type
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const statusMatch =
        statusFilter === "ALL" || payment.status === statusFilter;
      const typeMatch =
        typeFilter === "ALL" || payment.paymentType === typeFilter;
      return statusMatch && typeMatch;
    });
  }, [payments, statusFilter, typeFilter]);

  console.log(payments);

  return (
    <div className="bg-surface-dark rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-semibold text-slate-100">
          Payment History
        </h3>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {/* Status Filter */}
          <select
            className="bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
          </select>

          {/* Type Filter */}
          <select
            className="bg-slate-900 text-slate-200 border border-slate-700 rounded px-2 py-1"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="SUBSCRIPTION">Subscription</option>
            <option value="ISSUE_BOOST">Issue</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-900/60 text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Payment ID</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {filteredPayments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-slate-400"
                >
                  No payments found
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment._id} className="hover:bg-slate-900/40">
                  <td className="px-4 py-3 text-slate-300 truncate max-w-[180px]">
                    {payment.paymentId}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {payment.paymentType}
                  </td>
                  <td className="px-4 py-3 text-slate-100 font-medium">
                    ৳{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {payment.status === "SUCCESS" ? (
                      <span className="flex items-center gap-1 text-green-400">
                        <FaCheckCircle /> Success
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400">
                        <FaTimesCircle /> Failed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPaymentsPage;
