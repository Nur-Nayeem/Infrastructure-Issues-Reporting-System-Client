import React from "react";

const OurCommitMent = () => {
  return (
    <section className="bg-surface-dark border-y border-slate-800 py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
            Our Commitment to Transparency
          </h2>
          <p className="text-lg leading-8 text-slate-400">
            We believe in open data and public accountability. Our platform
            provides comprehensive analytics and public dashboards to ensure
            every report and its resolution process is transparent. Follow the
            journey of each issue and see how your contributions are making a
            measurable impact on community well-being.
          </p>
          <a
            className="text-sm font-semibold leading-6 text-primary hover:text-purple-400"
            href="#"
          >
            Explore Public Dashboards
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="rounded-xl overflow-hidden">
          <img
            alt="Data visualization dashboard"
            className="w-full h-auto object-cover"
            src="/commitment.png"
          />
        </div>
      </div>
    </section>
  );
};

export default OurCommitMent;
