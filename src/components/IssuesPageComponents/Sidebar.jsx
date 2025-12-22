import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineRocketLaunch } from "react-icons/md";

const Sidebar = ({
  category,
  setCategory,
  status,
  setStatus,
  priority,
  setPriority,
  setSearchText,
}) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div className="sticky top-32 flex flex-col gap-8">
      <div className="relative">
        <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          className="input-box"
          placeholder="Search Issues"
          type="search"
          onChange={handleSearch}
        />
      </div>
      <div className="space-y-6">
        <h3 className="font-display text-lg font-semibold text-white">
          Filters
        </h3>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-slate-300" for="category">
            Category
          </label>
          <select
            defaultValue={category}
            className="w-full bg-surface-dark border border-slate-800 rounded-lg py-2 px-3 text-sm text-white outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition"
            onChange={handleCategoryChange}
          >
            //TODO:category list must be change
            <option value={"All Categories"}>All Categories</option>
            <option value={"Infrastructure"}>Infrastructure</option>
            <option value={"Road"}>Road</option>
            <option value={"sanitation"}>sanitation</option>
            <option value={"Electricity"}>Electricity</option>
            <option value={"Water Supply"}>Water Supply</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-slate-300" for="status">
            Status
          </label>
          <select
            defaultValue={status}
            className="w-full bg-surface-dark border border-slate-800 rounded-lg py-2 px-3 text-sm text-white outline-0 focus:ring-1 focus:ring-primary focus:border-primary transition"
            onChange={handleStatusChange}
          >
            <option value={"Any Status"}>Any Status</option>
            <option value={"Resolved"}>Resolved</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Pending"}>Pending</option>
            <option value={"Closed"}>Closed</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-slate-300" for="priority">
            Priority
          </label>
          <select
            defaultValue={priority}
            className="w-full bg-surface-dark border border-slate-800 rounded-lg py-2 px-3 text-sm text-white outline-0 focus:ring-2 focus:ring-primary focus:border-primary transition"
            onChange={handlePriorityChange}
          >
            <option value={"Any Priority"}>Any Priority</option>
            <option value={"High"}>High</option>
            <option value={"Low"}>Low</option>
          </select>
        </div>
      </div>
      <div className="bg-surface-dark border border-purple-500/30 rounded-lg p-5 flex flex-col items-center text-center gap-3">
        <MdOutlineRocketLaunch className="text-3xl text-primary" />
        <h4 className="font-display text-base font-semibold text-white">
          Boosted Issues
        </h4>
        <p className="text-slate-400 text-xs leading-relaxed">
          Upvoting helps prioritize issues. Highly upvoted reports are flagged
          as high priority, accelerating their review and resolution process.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
