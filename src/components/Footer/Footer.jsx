import React from "react";

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
            <a
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              Home
            </a>
          </div>
          <div className="pb-6 text-center">
            <a
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              All Issues
            </a>
          </div>
          <div className="pb-6 text-center">
            <a
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              Features
            </a>
          </div>
          <div className="pb-6 text-center">
            <a
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              FAQ
            </a>
          </div>
          <div className="pb-6 text-center">
            <a
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              Contact Us
            </a>
          </div>
          <div className="pb-6 text-center">
            <a
              className="text-sm leading-6 text-slate-400 hover:text-white"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          <a className="text-slate-500 hover:text-primary" href="#">
            <span className="sr-only">Facebook</span>
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a className="text-slate-500 hover:text-primary" href="#">
            <span className="sr-only">Twitter</span>
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a className="text-slate-500 hover:text-primary" href="#">
            <span className="sr-only">GitHub</span>
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.852 0 1.336-.012 2.41-.012 2.737 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                fill-rule="evenodd"
              ></path>
            </svg>
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
