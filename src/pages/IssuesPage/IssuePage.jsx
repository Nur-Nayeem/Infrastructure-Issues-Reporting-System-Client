import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import IssueMainCard from "../../components/cards/IssueMainCard";
import Sidebar from "../../components/IssuesPageComponents/Sidebar";
import Pagination from "../../components/IssuesPageComponents/Pagination";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/Shared/Loader";

const IssuePage = () => {
  const axiosInstance = useAxios();
  const limit = 6;
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["issues", category, status, priority, searchText, currentPage],
    queryFn: async () => {
      const categoryQuery = category === "All Categories" ? "" : category;
      const statusQuery = status === "Any Status" ? "" : status;
      const priorityQuery = priority === "Any Priority" ? "" : priority;

      const response = await axiosInstance.get(
        `/issues?recent=true&limit=${limit}&skip=${
          (currentPage - 1) * limit
        }&category=${categoryQuery}&status=${statusQuery}&priority=${priorityQuery}&search=${searchText}`
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const totalPage = data ? Math.ceil(data.total / limit) : 0;
  const issues = data?.result || [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-red-400 text-center py-20">
        Error loading issues: {error.message}
      </div>
    );
  }

  return (
    <main className="flex-1 w-full container mx-auto px-2.5 sm:px-0 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-1/4 xl:w-1/5">
          <Sidebar
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
            setSearchText={setSearchText}
          />
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {issues.length > 0 ? (
              issues.map((issue) => (
                <IssueMainCard key={issue._id} issue={issue} />
              ))
            ) : (
              <p className="text-slate-500 col-span-full text-center py-10">
                No issues found matching your criteria.
              </p>
            )}
          </div>

          <div className="mt-12 flex justify-center">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default IssuePage;
