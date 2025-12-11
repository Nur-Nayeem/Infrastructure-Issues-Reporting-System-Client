import React from "react";
import {
  FaChartBar,
  FaList,
  FaPlus,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Logo } from "../../Navbar/Navbar";
import { NavLinkItem } from "./NavLink";

const SideBar = ({ setSidebarOpen, sidebarOpen, user }) => {
  const menuItems = [
    { path: "/dashboard/user-state", label: "Dashboard", icon: <FaChartBar /> },
    {
      path: "/dashboard/user/my-issues",
      label: "My Issues",
      icon: <FaList />,
    },
    { path: "/dashboard/user/report", label: "Report Issue", icon: <FaPlus /> },
    { path: "/dashboard/user/profile", label: "Profile", icon: <FaUser /> },
  ];

  const handleLogout = () => {};

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
            <div
              className={`rounded-full bg-primary/20 flex items-center justify-center text-primary p-4`}
            >
              <FaUser className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 truncate">
                {user.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{user.email}</span>
                {user.isPremium && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold bg-yellow-600 text-yellow-100 rounded-full`}
                  >
                    {user.subscription}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/*nav list */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
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
