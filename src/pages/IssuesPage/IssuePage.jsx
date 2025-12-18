import React, { useEffect, useState } from "react";
import IssueMainCard from "../../components/cards/IssueMainCard";
import Sidebar from "../../components/IssuesPageComponents/Sidebar";
import Pagination from "../../components/IssuesPageComponents/Pagination";
import useAxios from "../../hooks/useAxios";

const IssuePage = () => {
  const axiosInstance = useAxios();
  const [issues, setIssues] = useState([]);
  const { category, setCategory } = useState("");
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  // const { scrollYProgress } = useScroll();
  const limit = 6;

  useEffect(() => {
    // let categoryQuery = category;
    // if (category === "All") {
    //   categoryQuery = "";
    // }
    // setLoading(true);
    axiosInstance
      .get(
        `/issues?recent=true&limit=${limit}&skip=${(currentPage - 1) * limit}`
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
  }, [axiosInstance, category, searchText, currentPage]);

  // const handleCategoryChange = (e) => {
  //   setCategory(e.target.value);
  // };

  // const handleSearch = (e) => {
  //   setSearchText(e.target.value);
  // };

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
