import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import SideBar from "../components/DashBoardComponents/SideBar/SideBar";
import BlockedUser from "../components/DashBoardComponents/BlockedUser/BlockedUser";
import { Toaster } from "react-hot-toast";
import useUser from "../hooks/useUser";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { currentUser } = useUser();

  return (
    <div className={`min-h-screen bg-background-dark text-slate-300 flex`}>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`lg:hidden fixed top-4 right-4 z-50 p-3 text-accent bg-surface-dark rounded-xl shadow-2xl border border-slate-700 transition-colors hover:bg-slate-700`}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? (
          <FaTimes className="w-5 h-5" />
        ) : (
          <FaBars className="w-5 h-5" />
        )}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <SideBar
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        user={currentUser}
      />

      <div className="flex-1 overflow-x-hidden pt-20 lg:pt-0">
        <Toaster />
        <main className={`p-4 md:p-8 w-full`}>
          {currentUser?.isBlocked ? <BlockedUser /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
