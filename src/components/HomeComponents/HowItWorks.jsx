import React from "react";
import { MdOutlineAddTask, MdOutlineInsights } from "react-icons/md";
import ProcessCard from "../cards/ProcessCard";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
const WorkProcess = [
  {
    id: 1,
    title: "1. Submit with Ease",
    desc: "Capture the issue, add details, and submit your report through our intuitive platform.",
    icon: <MdOutlineAddTask className="text-3xl" />,
  },
  {
    id: 2,
    title: "2. Smart Dispatch",
    desc: "Our system intelligently routes your report to the appropriate municipal department.",
    icon: <HiOutlinePresentationChartLine className="text-3xl" />,
  },
  {
    id: 3,
    title: "3. Track &amp; Resolve",
    desc: " Receive real-time updates and a final notification when the issue is resolved.",
    icon: <MdOutlineInsights className="text-3xl" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="px-4 py-20 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
        How It Works
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">
        A streamlined process from identification to resolution, simplifying
        civic engagement.
      </p>

      <div className="relative mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:container lg:grid-cols-3 mt-16">
        <div className="absolute top-8 left-0 right-0 h-0.5 w-full hidden lg:block">
          <div className="h-full w-full bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>

        {WorkProcess.map((process, index) => (
          <ProcessCard key={index} process={process} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
