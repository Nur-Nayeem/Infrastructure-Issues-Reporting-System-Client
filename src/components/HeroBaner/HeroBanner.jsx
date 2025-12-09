import React from "react";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative flex justify-center items-center px-4 py-32 sm:py-48 md:py-56 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-background-dark via-background-dark/70 to-transparent z-10"></div>
        <div className="bg-[url('/hero.png')] absolute inset-0 h-full w-full bg-cover bg-center"></div>
        <div className="relative z-20 flex flex-col items-center gap-8 w-full max-w-4xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-display text-4xl font-bold leading-tight  sm:text-5xl md:text-6xl">
              Building Better Communities, Together
            </h1>
            <p className="text-slate-300 text-base font-normal leading-relaxed sm:text-lg max-w-2xl mx-auto">
              Report infrastructure issues, track their resolution, and be a
              part of the change in your neighborhood.
            </p>
            <div className="mt-4 flex gap-4 justify-center">
              <Link
                to="/issues"
                className="rounded-full bg-primary/90 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                View Issues
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
