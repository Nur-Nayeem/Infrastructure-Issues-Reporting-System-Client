import React from "react";
import { Timeline } from "primereact/timeline";
import { FaCircleCheck } from "react-icons/fa6";
import "primereact/resources/themes/lara-dark-blue/theme.css";

export default function StyledTimeline({ timeline = [] }) {
  if (!Array.isArray(timeline) || timeline.length === 0) {
    return <p className="text-xs text-slate-500 mt-2">No timeline available</p>;
  }

  const stasColors = {
    Pending: "#FACC15",
    "In-Progress": "#3B82F6",
    Working: "#FB923C",
    Resolved: "#22C55E",
    Closed: "#64748B",
    Rejected: "#EF4444",
  };

  // Convert DB timeline to PrimeReact format
  const events = timeline.map((item) => ({
    status: item.status,
    date: new Date(item.changedAt).toLocaleString(),
    color: stasColors[item.status] || "#94A3B8",
    changedBy: item.changedBy,
  }));

  const customizedMarker = (item) => (
    <span
      className="flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-md"
      style={{
        backgroundColor: `${item.color}20`,
        borderColor: item.color,
      }}
    >
      <FaCircleCheck className="text-lg" style={{ color: item.color }} />
    </span>
  );

  return (
    <div className="bg-surface-dark p-4 rounded-lg border border-slate-700">
      <Timeline
        value={events}
        opposite={(item) => (
          <p className="text-xs text-slate-400">{item.date}</p>
        )}
        content={(item) => (
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
            <p className="text-slate-300 text-sm font-medium">{item.status}</p>
            {item.changedBy && (
              <p className="text-xs text-slate-500 mt-1">by {item.changedBy}</p>
            )}
          </div>
        )}
        marker={customizedMarker}
      />
    </div>
  );
}
