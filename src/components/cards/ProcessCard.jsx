import React from "react";

const ProcessCard = ({ process }) => {
  return (
    <div className="flex flex-col items-center gap-y-4 relative">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 bg-surface-dark text-primary shadow-lg shadow-primary/10">
        {process.icon}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold leading-7 text-white font-display">
          {process.title}
        </h3>
        <p className="mt-2 text-base leading-7 text-slate-400">
          {process.desc}
        </p>
      </div>
    </div>
  );
};

export default ProcessCard;
