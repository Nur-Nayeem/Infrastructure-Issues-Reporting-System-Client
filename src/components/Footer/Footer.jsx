import React from "react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-background-dark border-t border-slate-800">
      <div className="container mx-auto overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="flex items-center justify-center gap-3 text-white mb-8">
          <div className="size-8 text-primary">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
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
        </div>
        <nav
          aria-label="Footer"
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          <div className="pb-6 text-center">
            <Link
              className="text-sm leading-6 text-slate-400 hover:text-white"
              to="/"
            >
              Home
            </Link>
          </div>
          <div className="pb-6 text-center">
            <Link
              className="text-sm leading-6 text-slate-400 hover:text-white"
              to="/all-issues"
            >
              All Issues
            </Link>
          </div>
          <div className="pb-6 text-center">
            <Link
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              Features
            </Link>
          </div>
          <div className="pb-6 text-center">
            <Link
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              FAQ
            </Link>
          </div>
          <div className="pb-6 text-center">
            <Link
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              Contact Us
            </Link>
          </div>
          <div className="pb-6 text-center">
            <Link
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              Privacy Policy
            </Link>
          </div>
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          <a className="text-slate-500 hover:text-primary" href="#">
            <FaFacebook />
          </a>
          <a className="text-slate-500 hover:text-primary" href="#">
            <FaTwitter />
          </a>
          <a className="text-slate-500 hover:text-primary" href="#">
            <FaGithub />
          </a>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-slate-500">
          © 2024 CivicResolve. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
