import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import EditStaffModal from "../../components/DashBoardComponents/modals/EditStaffModal";
import StaffTable from "../../components/DashBoardComponents/Tables/StaffTable";
import AddStaffModel from "../../components/DashBoardComponents/modals/AddStaffModel";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/Loader";
import DeleteModal from "../../components/DashBoardComponents/modals/DeleteModal";

export const AdminManageStaffPage = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const axiosSecureInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: staff = [],
    isLoading,
    refetch: staffRefetch,
  } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get("/staff");
      return res.data;
    },
  });
  const editStaffMutation = useMutation({
    mutationFn: async (updatedStaff) => {
      const { email, ...updateData } = updatedStaff;
      return axiosSecureInstance.patch(`/staff/${email}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast.success("Staff updated successfully");
      staffRefetch();
      setShowEditModal(null);
    },
    onError: () => toast.error("Failed to update staff"),
  });

  const deleteStaffMutation = useMutation({
    mutationFn: async (email) => {
      return axiosSecureInstance.delete(`/staff/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff"]);
      toast.success("Staff deleted");
      staffRefetch();
      setShowDeleteModal(null);
    },
    onError: () => toast.error("Delete failed"),
  });

  const filteredStaff = staff.filter(
    (m) =>
      m.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Staff</h1>
          <p className="text-slate-400">Manage staff accounts</p>
        </div>

        <div className="flex gap-4 justify-between items-center">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-box"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-1.5"
          >
            <FaUserPlus /> <span className="hidden sm:inline">Add Staff</span>
          </button>
        </div>
      </div>

      <StaffTable
        filteredStaff={filteredStaff}
        setShowEditModal={setShowEditModal}
        setShowDeleteModal={setShowDeleteModal}
      />

      {showAddModal && (
        <AddStaffModel
          setShowAddModal={setShowAddModal}
          staffRefetch={staffRefetch}
          // Note: Inside AddStaffModel, you should now call
          // queryClient.invalidateQueries(["staff"]) after a successful POST
        />
      )}

      {showEditModal && (
        <EditStaffModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          handleEditStaff={editStaffMutation.mutate} // Pass the mutation function
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={deleteStaffMutation.mutate}
          title={"Delete Staff Member"}
          text={`Are you sure you want to delete this staff member? This action cannot
          be undone. All assigned issues will need to be reassigned.`}
        />
      )}
    </div>
  );
};
