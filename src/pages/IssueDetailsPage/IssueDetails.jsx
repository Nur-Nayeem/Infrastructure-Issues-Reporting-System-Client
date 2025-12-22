import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { BsLightningCharge } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import StyledTimeline from "../../components/IssueDetailsComponents/TimeLine";
import IssueDetailsAction from "../../components/IssueDetailsComponents/IssueDetailsAction";
import AsssignStaff from "../../components/IssueDetailsComponents/AsssignStaff";
import DetailsContent from "../../components/IssueDetailsComponents/DetailsContent";
import useUser from "../../hooks/useUser";
import useAxios from "../../hooks/useAxios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/Loader";
const IssueDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const axiosSecureInstance = useAxiosSecure();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    data: issue = [],
    isLoading,
    refetch: refetchDetails,
  } = useQuery({
    queryKey: ["issues", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/issues/${id}`);
      return res.data;
    },
  });

  console.log(issue?.statusTimeline);

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

  const isOwner = currentUser?._id === issue.userId;

  const isAlreadyVoted = issue?.upvotedUsers?.some(
    (user) => user.email === currentUser?.email
  );

  const isPending = issue?.status === "Pending";

  const handleUpvote = async () => {
    try {
      if (user) {
        await axiosInstance.patch(`/issues/${issue?._id}/upvote`, {
          email: currentUser?.email,
        });
        toast.success("Upvoted successfully");
        refetchDetails();
      } else {
        toast.error("Login first");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Already upvoted");
    }
  };

  const handleDeleteIssue = useMutation({
    mutationFn: async () => {
      return axiosSecureInstance.delete(`/issues/${issue._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      toast.success("Issue deleted");
      navigate("/all-issues");
      setShowDeleteModal(false);
    },
    onError: () => toast.error("Delete failed"),
  });

  const handleBoostIssue = async (issueId) => {
    const res = await axiosSecureInstance.post("/payment-checkout-session", {
      issueId,
      userId: currentUser?._id,
    });
    const data = res.data;

    if (data.url) {
      window.location.href = data.url;
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-sm text-slate-400 hover:text-primary transition-colors"
      >
        <FaChevronLeft />
        Back to Issues
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-4 space-y-8">
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
            <DetailsContent
              issue={issue}
              handleUpvote={handleUpvote}
              isAlreadyVoted={isAlreadyVoted}
            />
          </div>
        </div>

        {/* right Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          {/* action card */}
          <IssueDetailsAction
            issue={issue}
            isOwner={isOwner}
            isPending={isPending}
            handleIssueDelete={handleDeleteIssue}
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            refetchDetails={refetchDetails}
            handleBoostIssue={handleBoostIssue}
          />

          {/* assigned staff */}
          <AsssignStaff issue={issue} />

          {/* timeline / tracking */}
          <div className="bg-surface-dark rounded-xl border border-slate-800 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-200 mb-6 font-display">
              Issue Timeline
            </h3>
            <StyledTimeline timeline={issue.statusTimeline} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
