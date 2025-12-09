import React from "react";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { MdOutlineAddTask, MdOutlineInsights } from "react-icons/md";
import FeatureCard from "../cards/FeaturedCard";

const FEATURES_DATA = [
  {
    id: 1,
    title: "Effortless Reporting",
    desc: "Submit issues in seconds with our streamlined reporting form. Add photos, locations, and details with ease.",
    icon: <MdOutlineAddTask className="text-3xl" />,
    colorClass: "text-primary bg-primary/10 border-primary/20",
  },
  {
    id: 2,
    title: "Real-Time Tracking",
    desc: "Stay informed with live status updates from submission to resolution. See progress as it happens.",
    icon: <HiOutlinePresentationChartLine className="text-3xl" />,
    colorClass: "text-secondary bg-secondary/10 border-secondary/20",
  },
  {
    id: 3,
    title: "Data-Driven Insights",
    desc: "Access dashboards and analytics to see the impact of community reports on a larger scale.",
    icon: <MdOutlineInsights className="text-3xl" />,
    colorClass: "text-accent bg-accent/10 border-accent/20",
  },
];

const Features = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl">
            Empowering Your Community
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-400">
            Everything you need to make a tangible difference in your
            neighborhood.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
