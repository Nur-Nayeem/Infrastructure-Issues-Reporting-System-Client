import React from "react";
import { BiUpvote } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";

const IssueMainCard = ({ issue }) => {
  return (
    <div className="group relative flex flex-col bg-surface-dark rounded-xl border border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      <div className="absolute left-0 top-0 h-full w-1.5 bg-slate-600"></div>
      <div className="relative">
        <img
          alt="Broken Streetlight"
          className="w-full h-56 object-cover"
          src={issue.image}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              issue.priority === "Low"
                ? "bg-slate-700 text-slate-300 border border-slate-600"
                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
            } `}
          >
            {issue.priority}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              issue.status === "Resolved"
                ? "bg-emerald-900/50 text-emerald-300"
                : issue.status === "In Progress"
                  ? "bg-amber-900/50 text-amber-300"
                  : issue.status === "Pending"
                    ? "bg-red-900/50 text-red-300"
                    : "bg-slate-800/50 text-slate-300"
            } `}
          >
            {issue.status}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
            {issue.category}
          </p>
          <h3 className="text-white text-lg font-display font-semibold mt-1 tracking-tight">
            {issue.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <IoLocationOutline className="text-base" />
          <p className="text-sm">{issue.location}</p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <button className="group flex items-center justify-center h-10 gap-2 px-3 rounded-full bg-slate-800/50 hover:bg-primary/20 border border-slate-700 hover:border-primary/50 transition-colors">
              <BiUpvote className="text-slate-400 group-hover:text-primary transition-colors text-xl" />
              <span className="text-base font-semibold text-white">
                {issue.upvoted}
              </span>
            </button>
          </div>
          <Link
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white bg-primary/20 hover:bg-primary/40 border border-primary/30 transition-colors"
            to={`/all-issues/${issue._id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssueMainCard;
