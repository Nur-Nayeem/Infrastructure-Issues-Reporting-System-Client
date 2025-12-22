import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BlockModal from "../../components/DashBoardComponents/modals/BlockModal";
import UserTable from "../../components/DashBoardComponents/Tables/UserTable";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/Loader";

export const AdminManageUsersPage = () => {
  const [showBlockModal, setShowBlockModal] = useState(null);
  const axiosSecureInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", "citizen"],
    queryFn: async () => {
      const res = await axiosSecureInstance.get("/users?role=citizen");
      return res.data;
    },
  });

  const { mutate: toggleUserBlock } = useMutation({
    mutationFn: async (email) => {
      return axiosSecureInstance.patch(`/users/${email}/blocked`);
    },
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries(["users", "citizen"]);
      setShowBlockModal(null);
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">Failed to load users.</div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Manage Users</h1>
          <p className="text-slate-400">
            Manage citizen accounts and subscriptions
          </p>
        </div>
        <div className="text-sm text-slate-400">
          Total: {users.length} users
        </div>
      </div>

      {/* Users Table */}
      <UserTable users={users} setShowBlockModal={setShowBlockModal} />

      {/* Block User Modal */}
      {showBlockModal && (
        <BlockModal
          setShowBlockModal={setShowBlockModal}
          showBlockModal={showBlockModal}
          toggleUserBlock={toggleUserBlock} // Now using the mutation function
        />
      )}
    </div>
  );
};
