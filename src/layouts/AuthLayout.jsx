import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex bg-background-dark">
      <div className="hidden lg:flex w-1/2 relative bg-surface-dark overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop"
          alt="City Life"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background-dark via-transparent to-transparent" />

        {/* overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-end p-12">
          <div className="bg-surface-dark/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-lg shadow-xl">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Make your city better, <br />
              <span className="text-primary">one issue at a time.</span>
            </h2>
            <p className="text-slate-200 leading-relaxed">
              Join thousands of citizens who are actively improving their
              neighborhoods. Report issues, track progress, and see change
              happen.
            </p>
          </div>
        </div>
      </div>

      {/* --- right side form --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
