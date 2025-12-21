import React, { useEffect, useState } from "react";
import BlockModal from "../../components/DashBoardComponents/modals/BlockModal";
import UserTable from "../../components/DashBoardComponents/Tables/UserTable";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const AdminManageUsersPage = () => {
  const [showBlockModal, setShowBlockModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const [users, setUsers] = useState([]);
  const axiosSecureInstance = useAxiosSecure();

  useEffect(() => {
    axiosSecureInstance
      .get("/users?role=citizen")
      .then((res) => setUsers(res.data));
  }, [axiosSecureInstance, refetch]);

  const toggleUserBlock = (email) => {
    console.log(email);

    axiosSecureInstance
      .patch(`/users/${email}/blocked`)
      .then(() => {
        toast.success(`success`);
        setRefetch(!refetch);
      })
      .catch((err) => {
        toast.error("Error", err);
      });
  };

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
          toggleUserBlock={toggleUserBlock}
        />
      )}
    </div>
  );
};
