import React, { useEffect, useState } from "react";
import IssueMainCard from "../../components/cards/IssueMainCard";
import Sidebar from "../../components/IssuesPageComponents/Sidebar";
import Pagination from "../../components/IssuesPageComponents/Pagination";
import useAxios from "../../hooks/useAxios";

const IssuePage = () => {
  const axiosInstance = useAxios();
  const [issues, setIssues] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 6;

  useEffect(() => {
    const fetchIssues = () => {
      let categoryQuery = category === "All Categories" ? "" : category;
      let statusQuery = status === "Any Status" ? "" : status;
      let priorityQuery = priority === "Any Priority" ? "" : priority;
      setLoading(true);
      axiosInstance
        .get(
          `/issues?recent=true&limit=${limit}&skip=${
            (currentPage - 1) * limit
          }&category=${categoryQuery}&status=${statusQuery}&priority=${priorityQuery}&search=${searchText}`
        )
        .then((data) => {
          console.log(data.data.result);
          setIssues(data.data.result);
          const page = Math.ceil(data.data.total / limit);
          setTotalPage(page);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchIssues();
  }, [axiosInstance, category, searchText, currentPage, priority, status]);

  console.log(category, status, priority);

  if (loading) {
    return (
      <div className="text-white text-center py-20">Loading issues...</div>
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
            {issues.map((issue, index) => (
              <IssueMainCard key={index} issue={issue} />
            ))}
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
