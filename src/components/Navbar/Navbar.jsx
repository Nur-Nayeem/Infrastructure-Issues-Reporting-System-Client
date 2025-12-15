import { use } from "react";
import { MdDashboard, MdLogout } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/Contexts";
import { Logo } from "../Logo/Logo";

const Navbar = ({ open, setOpen }) => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/all-issues", label: "All Issues" },
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How It Works" },
  ];

  const { user, logOutUSer } = use(AuthContext);
  console.log(user);

  return (
    <div className="flex items-center justify-between w-full container">
      <Logo />

      {/* Navigation Links using NavLink */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-10">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className="nav-styles">
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            {/* Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 outline-none"
            >
              <img
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-700 transition"
                src={user && user.photoURL ? user.photoURL : "/avatar.jpg"}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full mt-2 w-56 origin-top-right rounded-lg bg-surface-dark border border-slate-800 shadow-lg shadow-black/20 ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out
            ${open ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
            >
              <div className="py-1">
                <div className="px-4 py-3">
                  <p className="text-sm text-white">{user?.displayName}</p>
                </div>
                <div className="border-t border-slate-800"></div>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                >
                  <MdDashboard className="text-base" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={logOutUSer}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                >
                  <MdLogout className="text-base" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-5 items-center">
            <Link to={"/login"} className="btn-secondary">
              Login
            </Link>
            <Link to={"/register"} className="btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
