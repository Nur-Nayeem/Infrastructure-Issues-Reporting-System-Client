export const StatCard = ({ stat }) => {
  return (
    <div className="bg-surface-dark rounded-xl p-4 border border-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{stat.title}</p>
          <p className="text-2xl font-bold text-slate-100 mt-2">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
      </div>
    </div>
  );
};
