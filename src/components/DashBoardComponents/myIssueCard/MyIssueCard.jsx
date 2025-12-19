import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const MyIssueCard = ({ issue, getStatusIcon, refetch }) => {
  const axiosInstance = useAxios();
  const handleDeleteIssue = () => {
    axiosInstance
      .delete(`/issues/${issue._id}`)
      .then((res) => {
        console.log(res);
        toast.success("Deleted Issue");
        refetch();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error To Delete");
      });
  };
  return (
    <div
      key={issue.id}
      className="bg-surface-dark rounded-xl border border-slate-700 p-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {getStatusIcon(issue.status)}
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
          {issue.status === "Pending" && (
            <button className="p-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30">
              <FaEdit />
            </button>
          )}
          <button
            onClick={handleDeleteIssue}
            className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30"
          >
            <FaTrash />
          </button>
          <Link
            to={`/all-issues/${issue._id}`}
            className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600"
          >
            <FaEye />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyIssueCard;
