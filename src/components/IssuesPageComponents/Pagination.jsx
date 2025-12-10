import React from "react";

const Pagination = () => {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-4 text-sm">
      <a
        className="flex items-center justify-center size-9 rounded-lg bg-surface-dark border border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-colors"
        href="#"
      >
        <span className="sr-only">Previous</span>
        <FaChevronLeft className="text-lg" />
      </a>
      <a
        aria-current="page"
        className="flex items-center justify-center size-9 rounded-lg bg-primary border-primary text-white font-semibold"
        href="#"
      >
        1
      </a>
      <a
        className="flex items-center justify-center size-9 rounded-lg bg-surface-dark border border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-colors"
        href="#"
      >
        2
      </a>
      <a
        className="flex items-center justify-center size-9 rounded-lg bg-surface-dark border border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-colors"
        href="#"
      >
        3
      </a>
      <span className="text-slate-500">...</span>
      <a
        className="flex items-center justify-center size-9 rounded-lg bg-surface-dark border border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-colors"
        href="#"
      >
        10
      </a>
      <a
        className="flex items-center justify-center size-9 rounded-lg bg-surface-dark border border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-colors"
        href="#"
      >
        <span className="sr-only">Next</span>
        <FaChevronRight className="text-lg" />
      </a>
    </nav>
  );
};

export default Pagination;
