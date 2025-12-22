import React from "react";
import { FaCity, FaUsers, FaClock, FaShieldAlt } from "react-icons/fa";

const AboutUsSection = () => {
  return (
    <section className="py-20 bg-background-dark">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-display text-4xl font-bold text-white tracking-tight">
            About Our Platform
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            We built this platform to bridge the gap between citizens and
            authorities, ensuring public infrastructure issues are reported,
            tracked, and resolved with transparency and accountability.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="rounded-2xl bg-surface-dark border border-slate-800 p-6 hover:border-primary/50 transition">
            <FaCity className="text-primary text-3xl mb-4" />
            <h3 className="font-sans text-lg font-semibold text-white">
              Smart City Focus
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Improve urban living by identifying and resolving infrastructure
              problems efficiently.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-surface-dark border border-slate-800 p-6 hover:border-primary/50 transition">
            <FaUsers className="text-primary text-3xl mb-4" />
            <h3 className="font-sans text-lg font-semibold text-white">
              Citizen Driven
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Citizens actively participate by reporting, upvoting, and tracking
              issues in real time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-surface-dark border border-slate-800 p-6 hover:border-primary/50 transition">
            <FaClock className="text-primary text-3xl mb-4" />
            <h3 className="font-sans text-lg font-semibold text-white">
              Faster Resolution
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Structured workflows reduce delays and ensure timely responses
              from authorities.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl bg-surface-dark border border-slate-800 p-6 hover:border-primary/50 transition">
            <FaShieldAlt className="text-primary text-3xl mb-4" />
            <h3 className="font-sans text-lg font-semibold text-white">
              Transparent & Secure
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Every action is tracked through a timeline to maintain trust,
              accountability, and data integrity.
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-16 max-w-4xl">
          <p className="text-slate-400 leading-relaxed">
            Our mission is to empower communities and help governments deliver
            better public services. Together, we can build cleaner, safer, and
            more efficient cities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
