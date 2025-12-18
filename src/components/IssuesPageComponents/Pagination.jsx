import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-4 text-sm">
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="flex items-center justify-center size-9 rounded-lg bg-surface-dark border border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-colors"
        >
          <span className="sr-only">Previous</span>
          <FaChevronLeft className="text-lg" />
        </button>
      )}

      {[...Array(totalPage).keys()].map((i) => (
        <button
          className={`flex items-center justify-center size-9 rounded-lg border border-primary text-white font-semibold ${
            i + 1 === currentPage && "bg-primary"
          }`}
          key={i}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      {currentPage < totalPage && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="flex items-center justify-center size-9 rounded-lg bg-surface-dark border border-slate-800 text-slate-400 hover:border-primary hover:text-primary transition-colors"
        >
          <span className="sr-only">Next</span>
          <FaChevronRight className="text-lg" />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
