import React from "react";

const FrequentlyAskedQn = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            Have questions? We have answers. Find information about common
            queries below.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto flex flex-col gap-4">
          <div className="rounded-lg bg-surface-dark border border-slate-800 p-6">
            <h3 className="font-semibold text-white">
              What kind of issues can I report?
            </h3>
            <p className="mt-2 text-slate-400">
              You can report a wide range of non-emergency public infrastructure
              issues, including potholes, broken streetlights, graffiti, damaged
              sidewalks, and more. If you're unsure, it's always best to report
              it.
            </p>
          </div>
          <div className="rounded-lg bg-surface-dark border border-slate-800 p-6">
            <h3 className="font-semibold text-white">
              How long does it take for an issue to be resolved?
            </h3>
            <p className="mt-2 text-slate-400">
              Resolution times vary depending on the complexity and priority of
              the issue. Our platform provides real-time status updates so you
              can track the progress of your report from submission to
              completion.
            </p>
          </div>
          <div className="rounded-lg bg-surface-dark border border-slate-800 p-6">
            <h3 className="font-semibold text-white">
              Is my personal information kept private?
            </h3>
            <p className="mt-2 text-slate-400">
              Absolutely. We are committed to protecting your privacy. Your
              personal information is only used to communicate with you about
              your report and is not shared publicly. Please review our Privacy
              Policy for more details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQn;
