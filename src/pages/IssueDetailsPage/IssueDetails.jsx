import React from "react";
import { Link, useNavigate } from "react-router";
import { BsLightningCharge } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";
import StyledTimeline from "../../components/IssueDetailsComponents/TimeLine";
import IssueDetailsAction from "../../components/IssueDetailsComponents/IssueDetailsAction";
import AsssignStaff from "../../components/IssueDetailsComponents/AsssignStaff";
import DetailsContent from "../../components/IssueDetailsComponents/DetailsContent";

const currnetUser = {
  id: "user_123",
  name: "Nur Nayeem",
  role: "citizen",
};

const mocIssues = {
  id: "issue_99",
  title: "Deep Pothole Causing Accidents on Main Street",
  description:
    "There is a massive pothole in the middle of the road near the city center intersection. It has caused damage to multiple vehicles and is a serious safety hazard for pedestrians crossing the street. Please fix this urgently before someone gets hurt. I have attached a photo of the damage.",
  category: "Roads & Safety",
  status: "pending",
  priority: "high",
  location: "Mirpur-2, Dhaka",
  imageUrl:
    "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop",
  upvotes: 45,
  isBoosted: false,
  createdAt: "2025-10-24T10:00:00Z",
  userId: "user_123",
  user: {
    name: "Nur Nayeem",
    profileImg: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  assignedStaff: {
    name: "Sarah Engineer",
    role: "Senior Civil Engineer",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "sarah@cityresolve.com",
  },
  timeline: [
    {
      id: 3,
      status: "In Progress",
      message: "Work started on the issue. Crew dispatched.",
      updatedBy: "Sarah Engineer (Staff)",
      date: "2025-10-26T09:30:00Z",
      type: "status_change",
    },
    {
      id: 2,
      status: "Pending",
      message: "Issue assigned to Staff: Sarah Engineer",
      updatedBy: "Admin",
      date: "2025-10-25T14:00:00Z",
      type: "assignment",
    },
    {
      id: 1,
      status: "Pending",
      message: "Issue reported by citizen",
      updatedBy: "Alex Johnson",
      date: "2025-10-24T10:00:00Z",
      type: "creation",
    },
  ],
};

const IssueDetails = () => {
  const navigate = useNavigate();

  const issue = mocIssues;
  const currentUser = currnetUser;

  // Status Badge
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "in-progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "closed":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    }
  };

  const isOwner = currentUser.id === issue.userId;
  const isPending = issue.status.toLowerCase() === "pending";

  const handleUpvote = () => {
    alert("Upvoted! (API Logic here)");
  };

  const handleBoost = () => {
    alert("Redirecting to Payment Gateway for Boost (100tk)...");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      alert("Issue Deleted");
      //   navigate("/my-issues");
    }
  };

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
                src={issue.imageUrl}
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
                {issue.isBoosted && (
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
            handleBoost={handleBoost}
            handleDelete={handleDelete}
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
