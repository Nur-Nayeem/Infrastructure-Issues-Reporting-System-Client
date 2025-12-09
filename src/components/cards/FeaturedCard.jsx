const FeatureCard = ({ feature }) => {
  return (
    <div className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-surface-dark border border-slate-800 hover:border-slate-700 transition-colors">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-lg border ${feature.colorClass}`}
      >
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold text-white font-display">
        {feature.title}
      </h3>
      <p className="text-slate-400">{feature.desc}</p>
    </div>
  );
};
export default FeatureCard;
