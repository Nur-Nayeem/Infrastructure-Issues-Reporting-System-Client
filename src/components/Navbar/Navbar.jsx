import { MdDashboard, MdLogout, MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/issues", label: "All Issues" },
    { to: "/features", label: "Features" },
    { to: "/how-it-works", label: "How It Works" },
  ];
  return (
    <div className="flex items-center justify-between w-full container">
      <Link to="/" className="flex items-center gap-3 text-white">
        <div className="size-8 text-primary">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21v-2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v2"></path>
            <path d="M16 17v-2a4 4 0 0 0-4-4H4"></path>
            <path d="M20 17v-2a4 4 0 0 0-4-4h-4"></path>
            <circle cx="12" cy="5" r="4"></circle>
          </svg>
        </div>
        <h2 className="text-white text-xl font-display font-semibold tracking-wide">
          CivicResolve
        </h2>
      </Link>

      {/* Navigation Links using NavLink */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-10">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className="nav-styles">
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Profile / Mobile Menu */}
      <div className="flex items-center gap-4">
        {/* Profile Dropdown (Visual Only) */}
        <div className="relative group">
          <button className="flex items-center gap-2 outline-none">
            <img
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-slate-700 group-hover:border-slate-300 transition"
              src="https://avatars.githubusercontent.com/u/109820227?v=4"
            />
          </button>
          <div className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-lg bg-surface-dark border border-slate-800 shadow-lg shadow-black/20 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out">
            <div className="py-1">
              <div className="px-4 py-3">
                <p className="text-sm text-white">Nur Nayeem</p>
              </div>
              <div className="border-t border-slate-800"></div>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              >
                <MdDashboard className="text-base" />
                <span>Dashboard</span>
              </Link>
              <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800/50 hover:text-slate-200">
                <MdLogout className="text-base" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
