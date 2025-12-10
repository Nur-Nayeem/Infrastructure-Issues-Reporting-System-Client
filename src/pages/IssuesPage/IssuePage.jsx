import React from "react";
import IssueMainCard from "../../components/cards/IssueMainCard";
import Sidebar from "../../components/IssuesPageComponents/Sidebar";
import { issues } from "../../data/Issues";

const IssuePage = () => {
  return (
    <main className="flex-1 w-full container mx-auto px-2.5 sm:px-0 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <Sidebar />
        </aside>
        <section className="flex-1">
          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-white tracking-tight">
              All Reported Issues
            </h1>
            <p className="mt-2 text-slate-400">
              Browse, upvote, and track public infrastructure issues reported by
              the community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue, index) => (
              <IssueMainCard key={index} issue={issue} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">{/* Pagination  */}</div>
        </section>
      </div>
    </main>
  );
};

export default IssuePage;
