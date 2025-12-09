import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router";

const LatestSolvedIssueCard = ({ issue }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-surface-dark border border-slate-800 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row">
        <img
          src={issue.img}
          alt="issue image"
          className="sm:w-1/3 w-full h-44"
        />

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{issue.title}</h3>
              <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400 border border-green-500/20">
                Resolved
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              {issue.location} • Dhaka
            </p>
            <div className="mt-2 flex items-center gap-4">
              <span
                className={`inline-flex items-center  px-2 py-0.5 text-xs font-medium ${
                  issue.priority === "High"
                    ? "bg-red-600/20 text-red-400 border border-red-600/30"
                    : "bg-slate-700 "
                } rounded-4xl`}
              >
                {issue.priority} Priority
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <button className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white">
              <FaThumbsUp />
              <span className="text-sm font-medium">128</span>
            </button>
            <Link
              className="inline-flex items-center justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700"
              href="#"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestSolvedIssueCard;
