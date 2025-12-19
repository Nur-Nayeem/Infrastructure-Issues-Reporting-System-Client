import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaTimesCircle,
  FaClock,
  FaCog,
  FaCheckCircle,
} from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AssignTaskModal from "../../components/DashBoardComponents/modals/AssignTaskModal";
import RejectIssueModal from "../../components/DashBoardComponents/modals/RejectIssueModal";
import AllIssuesTable from "../../components/DashBoardComponents/Tables/AllIssuesTable";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

export const AdminAllIssuesPage = () => {
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showAssignModal, setShowAssignModal] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("");

  const {
    data: issues = [],
    isLoading,
    refetch: refetchIssues,
  } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const res = await axiosInstance.get("/issues");
      return res.data.result;
    },
  });

  const { data: staffList = [], refetch: refetchStaff } = useQuery({
    queryKey: ["staff", "active"],
    enabled: !!selectedIssue,
    queryFn: async () => {
      const res = await axiosInstance.get("/staff?status=active");
      return res.data;
    },
  });

  console.log(staffList);

  const rejectMutation = useMutation({
    mutationFn: async (issueId) => {
      return axiosInstance.patch(`/issues/${issueId}/rejected`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["issues"]);
      setShowRejectModal(null);
    },
  });

  const handleRejectIssue = (issueId) => {
    rejectMutation.mutate(issueId);
  };

  const handleAssignStaff = (issueId, staff) => {
    console.log("Assigned:", issueId, staff);

    axiosInstance
      .patch(`/issues/${issueId}/assign-staff`, {
        staffEmail: staff,
      })
      .then((res) => {
        console.log(res);
        toast.success("Issues Assigned to ", staff);
        refetchIssues();
        refetchStaff();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Faild To Assign", err);
        refetchIssues();
        refetchStaff();
      });
    setShowAssignModal(null);
  };

  const filteredIssues = useMemo(() => {
    let data = [...issues];

    if (filter !== "All") {
      data = data.filter((i) => i.status === filter);
    }

    if (search) {
      data = data.filter(
        (i) =>
          i.title?.toLowerCase().includes(search.toLowerCase()) ||
          i.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "newest") {
      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    if (sort === "oldest") {
      data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return data;
  }, [issues, filter, search, sort]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaClock className="text-yellow-500" />;
      case "In-Progress":
        return <FaCog className="text-blue-500" />;
      case "Resolved":
        return <FaCheckCircle className="text-green-500" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">All Issues</h1>
        <div className="text-sm text-slate-300">
          Total: {filteredIssues.length} issues
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-dark rounded-xl p-4 border border-slate-700 mb-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-box"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-box"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <FaSort className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              className="input-box"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <AllIssuesTable
        filteredIssues={filteredIssues}
        getStatusIcon={getStatusIcon}
        setShowAssignModal={setShowAssignModal}
        setShowRejectModal={setShowRejectModal}
        setSelectedIssue={setSelectedIssue}
        isLoading={isLoading}
      />

      {/* Assign Modal */}
      {showAssignModal && (
        <AssignTaskModal
          staffList={staffList}
          showAssignModal={showAssignModal}
          setShowAssignModal={setShowAssignModal}
          handleAssignStaff={handleAssignStaff}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
          selectedIssue={selectedIssue}
        />
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <RejectIssueModal
          showRejectModal={showRejectModal}
          setShowRejectModal={setShowRejectModal}
          handleRejectIssue={handleRejectIssue}
        />
      )}
    </div>
  );
};
