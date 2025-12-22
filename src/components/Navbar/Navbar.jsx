import { use, useState } from "react";
import { MdDashboard, MdLogout, MdMenu, MdClose } from "react-icons/md";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../context/Contexts";
import { Logo } from "../Logo/Logo";
import { LuX } from "react-icons/lu";
const Navbar = ({ open, setOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/all-issues", label: "All Issues" },
    { to: "/about-us", label: "About Us" },
    { to: "/coverage", label: "Coverage" },
  ];

  const { user, logOutUSer } = use(AuthContext);

  return (
    <>
      {/* Navbar */}
      <div className="flex items-center justify-between w-full container">
        {/* Hamburger (Mobile Only - Left Side) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-3xl cursor-pointer"
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>

        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-10">
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
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 outline-none cursor-pointer"
              >
                <img
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-700 transition"
                  src={user?.photoURL ? user.photoURL : "/avatar.jpg"}
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
                    <MdDashboard />
                    Dashboard
                  </Link>

                  <button
                    onClick={logOutUSer}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  >
                    <MdLogout />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 items-center">
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary hidden sm:flex">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (No Design Change – Same Links) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-surface-dark z-50 transform transition-transform duration-300 lg:hidden
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="relative px-6 py-10 bg-surface-dark rounded-2xl">
          <LuX
            className="absolute right-4 text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
          <div className="flex flex-col justify-center items-center gap-6 mt-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="nav-styles"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
