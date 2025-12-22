import React, { useState } from "react";
import { FaEdit, FaEye, FaRocket, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import toast from "react-hot-toast";
import EditIssueModal from "../modals/EditIssueModal";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../modals/DeleteModal";

const MyIssueCard = ({ issue, getStatusIcon, refetch }) => {
  const axiosSecureInstance = useAxiosSecure();
  const { currentUser } = useUser();
  const [editIssuesModal, setEditIssuesModal] = useState(false);
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteIssue = useMutation({
    mutationFn: async () => {
      return axiosSecureInstance.delete(`/issues/${issue._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      toast.success("Issue deleted");
      refetch();
      setShowDeleteModal(false);
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleBoostIssue = async (issueId, currentUser) => {
    const res = await axiosSecureInstance.post("/payment-checkout-session", {
      issueId,
      userId: currentUser?._id,
    });
    const data = res.data;

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <>
      <div
        key={issue.id}
        className="bg-surface-dark rounded-xl border border-slate-700 p-4"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(issue.status)}
                <span>{issue.status}</span>
              </div>

              <span
                className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${
                        issue.priority === "High"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-slate-700 text-slate-300"
                      }
                    `}
              >
                {issue.priority}
              </span>
              <span className="text-sm text-slate-400">{issue.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-1">
              {issue.title}
            </h3>
            <p className="text-slate-400 text-sm">{issue.category}</p>
          </div>

          <div className="flex gap-2">
            {issue.priority === "Low" && (
              <button
                onClick={() => handleBoostIssue(issue._id, currentUser)}
                className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg hover:bg-yellow-500/30 cursor-pointer"
                title="Boost Issue"
              >
                <FaRocket />
              </button>
            )}

            <Link
              to={`/all-issues/${issue._id}`}
              className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 cursor-pointer"
              title="View Details"
            >
              <FaEye />
            </Link>
            {/* Only show Edit button if status is Pending */}
            {issue.status === "Pending" && (
              <button
                onClick={() => setEditIssuesModal(true)}
                className="p-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 cursor-pointer"
                title="Edit Issue"
              >
                <FaEdit />
              </button>
            )}

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 cursor-pointer"
              title="Delete Issue"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>

      {/* Render Modal */}
      <EditIssueModal
        isOpen={editIssuesModal}
        onClose={() => setEditIssuesModal(false)}
        issue={issue}
        refetch={refetch}
      />
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDeleteIssue.mutate}
          title={"Delete Issue"}
          text={`Are you sure you want to delete this Issue?`}
        />
      )}
    </>
  );
};

export default MyIssueCard;
