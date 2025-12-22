import React from "react";
import {
  FaChartBar,
  FaCreditCard,
  FaList,
  FaPlus,
  FaSignOutAlt,
  FaUser,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

import { NavLinkItem } from "./NavLink";
import { Logo } from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";

const SideBar = ({ setSidebarOpen, sidebarOpen, user }) => {
  const { logOutUSer } = useAuth();
  let menuItems;
  if (user?.role === "citizen") {
    menuItems = [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: <FaChartBar />,
      },
      {
        path: "/dashboard/user/my-issues",
        label: "My Issues",
        icon: <FaList />,
      },
      {
        path: "/dashboard/user/report",
        label: "Report Issue",
        icon: <FaPlus />,
      },
      { path: "/dashboard/user/profile", label: "Profile", icon: <FaUser /> },
    ];
  } else if (user?.role === "admin") {
    menuItems = [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: <FaChartBar />,
      },
      {
        path: "/dashboard/admin/issues",
        label: "All Issues",
        icon: <FaList />,
      },
      {
        path: "/dashboard/admin/manage-users",
        label: "Manage Users",
        icon: <FaUsers />,
      },
      {
        path: "/dashboard/admin/manage-staff",
        label: "Manage Staff",
        icon: <FaUserTie />,
      },
      {
        path: "/dashboard/admin/payments",
        label: "Payments",
        icon: <FaCreditCard />,
      },
      { path: "/dashboard/admin/profile", label: "Profile", icon: <FaUser /> },
    ];
  } else {
    menuItems = [
      { path: "/dashboard", label: "Dashboard", icon: <FaChartBar /> },
      {
        path: "/dashboard/staff/assigned-issues",
        label: "Assigned Issues",
        icon: <FaList />,
      },
      { path: "/dashboard/staff/profile", label: "Profile", icon: <FaUser /> },
    ];
  }

  const handleLogout = () => {
    logOutUSer();
  };

  return (
    <aside
      className={`
          fixed lg:sticky top-0 h-screen w-64 bg-surface-dark border-r border-slate-700 shadow-2xl z-40
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
    >
      <div className="h-full flex flex-col">
        {/* Branding/Title Area */}
        <div className={`p-6 border-b border-slate-700`}>
          <Logo />
        </div>

        {/* User Info */}
        <div className={`p-4 border-b border-slate-700 bg-slate-700/30`}>
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img
                src={user?.photoURL}
                alt=""
                className="rounded-full w-12 h-12"
              />
            ) : (
              <div
                className={`rounded-full bg-primary/20 flex items-center justify-center text-primary p-4`}
              >
                <FaUser className="w-4 h-4" />
              </div>
            )}

            <div>
              <h3 className="font-semibold text-slate-100 truncate">
                {user?.displayName.split(" ")[0]}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 break-all">
                  {user?.email}
                </span>

                {user?.isPremium && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold bg-yellow-600 text-yellow-100 rounded-full`}
                  >
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*nav list */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems?.map((item) => (
            <NavLinkItem
              key={item.path}
              item={item}
              onClick={() => setSidebarOpen(false)}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t border-slate-700`}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg text-primary/70 hover:bg-slate-700/50 cursor-pointer transition-colors group"
          >
            <FaSignOutAlt className="w-5 h-5 group-hover:text-primary" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
