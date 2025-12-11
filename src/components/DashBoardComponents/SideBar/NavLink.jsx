import { NavLink } from "react-router";

export const NavLinkItem = ({ item, onClick }) => {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className="
        flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out nav-styles hover:bg-slate-700/50"
    >
      <span className="w-5 h-5">{item.icon}</span>
      <span>{item.label}</span>
    </NavLink>
  );
};
