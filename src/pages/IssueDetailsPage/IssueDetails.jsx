import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { BsLightningCharge } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import StyledTimeline from "../../components/IssueDetailsComponents/TimeLine";
import IssueDetailsAction from "../../components/IssueDetailsComponents/IssueDetailsAction";
import AsssignStaff from "../../components/IssueDetailsComponents/AsssignStaff";
import DetailsContent from "../../components/IssueDetailsComponents/DetailsContent";
import useUser from "../../hooks/useUser";
import useAxios from "../../hooks/useAxios";

const IssueDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const axiosInstance = useAxios();
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/issues/${id}`)
      .then((data) => {
        console.log(data);

        setDetails(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [axiosInstance, id, refetch]);

  const issue = details;

  // Status Badge
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "In-Progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Closed":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };
  console.log(currentUser);

  const isOwner = currentUser?._id === issue.userId;
  console.log(issue);

  const isPending = issue?.status === "Pending";

  const handleUpvote = () => {
    alert("Upvoted! (API Logic here)");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      alert("Issue Deleted");
      //   navigate("/my-issues");
    }
  };

  if (loading)
    return (
      <div className="h-96 flex justify-center items-center">
        <h2>Loafing...</h2>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm text-slate-400 hover:text-primary transition-colors"
      >
        <FaChevronLeft />
        Back to Issues
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface-dark rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Image Section */}
            <div className="relative h-64 md:h-96 w-full">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${getStatusColor(
                    issue.status
                  )} uppercase tracking-wider`}
                >
                  {issue.status}
                </span>
                {issue.priority === "High" && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md flex items-center gap-1">
                    <BsLightningCharge />
                    Boosted
                  </span>
                )}
              </div>
            </div>

            {/* content section */}
            <DetailsContent issue={issue} handleUpvote={handleUpvote} />
          </div>
        </div>

        {/* right Sidebar */}
        <div className="space-y-6">
          {/* action card */}
          <IssueDetailsAction
            issue={issue}
            isOwner={isOwner}
            isPending={isPending}
            handleDelete={handleDelete}
            refetch={refetch}
            setRefetch={setRefetch}
          />

          {/* assigned staff */}
          <AsssignStaff issue={issue} />

          {/* timeline / tracking */}
          <div className="bg-surface-dark rounded-xl border border-slate-800 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-200 mb-6 font-display">
              Issue Timeline
            </h3>
            <StyledTimeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
