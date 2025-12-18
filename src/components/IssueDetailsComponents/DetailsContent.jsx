import React from "react";
import { BiUpvote } from "react-icons/bi";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";

const DetailsContent = ({ issue, handleUpvote }) => {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-100 mb-2">
            {issue.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1">
              <TbCategoryPlus />
              {issue.category}
            </span>
            <span className="flex items-center gap-1">
              <IoLocationOutline />
              {issue.location}
            </span>
            <span className="flex items-center gap-1">
              <IoTimeOutline />
              {new Date(issue.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Upvote Button (Details Page) */}
        <button
          onClick={handleUpvote}
          className="flex flex-col items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-3 min-w-16 transition-all group"
        >
          <BiUpvote className="text-2xl" />
          <span className="text-lg font-bold text-slate-200">
            {issue.upvoted}
          </span>
        </button>
      </div>

      <div className="prose prose-invert max-w-none">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">
          Description
        </h3>
        <p className="text-slate-400 leading-relaxed whitespace-pre-line">
          {issue.description}
        </p>
      </div>

      {/* Reported By */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
        {/* <img
          src={issue.user.profileImg}
          alt={issue.user.name}
          className="w-10 h-10 rounded-full bg-slate-700"
        /> */}
        <div className="w-10 h-10 rounded-full bg-slate-700 text-primary flex justify-center items-center text-2xl font-bold">
          U
        </div>
        <div>
          <p className="text-xs text-slate-500 uppercase font-semibold">
            Reported by
          </p>
          <p className="text-slate-300 font-medium">{issue.reportedBy}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsContent;
