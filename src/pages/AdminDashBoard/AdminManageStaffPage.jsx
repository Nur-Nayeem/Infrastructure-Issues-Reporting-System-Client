import React, { useEffect, useState } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import DeleteStaffModal from "../../components/DashBoardComponents/modals/DeleteStaffModal";
import EditStaffModal from "../../components/DashBoardComponents/modals/EditStaffModal";
import StaffTable from "../../components/DashBoardComponents/Tables/StaffTable";
import AddStaffModel from "../../components/DashBoardComponents/modals/AddStaffModel";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

export const AdminManageStaffPage = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [staff, setStaff] = useState([]);
  const [refetch, setRefetch] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/staff").then((res) => setStaff(res.data));
  }, [axiosInstance, refetch]);

  const handleEditStaff = async (updatedStaff) => {
    try {
      const { email, ...updateData } = updatedStaff;

      await axiosInstance.patch(`/staff/${email}`, updateData);

      setStaff((prev) =>
        prev.map((item) =>
          item.email === email ? { ...item, ...updateData } : item
        )
      );

      toast.success("Staff updated successfully");
      setShowEditModal(null);
    } catch {
      toast.error("Failed to update staff");
    }
  };

  const handleDeleteStaff = async (email) => {
    try {
      await axiosInstance.delete(`/staff/${email}`);
      setStaff((prev) => prev.filter((item) => item.email !== email));
      toast.success("Staff deleted");
      setShowDeleteModal(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredStaff = staff.filter(
    (m) =>
      m.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

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
              placeholder="Search issues..."
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
          setRefetch={setRefetch}
          refetch={refetch}
        />
      )}

      {showEditModal && (
        <EditStaffModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          handleEditStaff={handleEditStaff}
        />
      )}

      {showDeleteModal && (
        <DeleteStaffModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handleDeleteStaff={handleDeleteStaff}
        />
      )}
    </div>
  );
};
