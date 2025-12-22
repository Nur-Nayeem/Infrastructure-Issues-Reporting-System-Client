import React from "react";
import IssueMainCard from "../cards/IssueMainCard";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/Loader";

const LatestResolvedIssues = () => {
  const axiosInstance = useAxios();
  const { data: latesSolved = [], isLoading } = useQuery({
    queryKey: ["latestSolved"],
    queryFn: async () => {
      const res = await axiosInstance.get("/issues?status=Resolved&limit=8");
      return res.data.result;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-display font-semibold tracking-tight">
          Latest Resolved Issues
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Recent issues addressed by our dedicated teams, thanks to community
          reports.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {latesSolved.map((issue) => (
          <IssueMainCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default LatestResolvedIssues;
