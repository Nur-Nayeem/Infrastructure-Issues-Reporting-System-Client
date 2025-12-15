import { Link } from "react-router";

export const Logo = () => {
  return (
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
  );
};
