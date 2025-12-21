import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-center px-4">
      <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-100 mb-2">
        Page Not Found
      </h2>
      <p className="text-slate-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
