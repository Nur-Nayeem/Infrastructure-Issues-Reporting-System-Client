import React from "react";
import { Timeline } from "primereact/timeline";
import { FaCircleCheck } from "react-icons/fa6";
import "primereact/resources/themes/lara-dark-blue/theme.css";

export default function StyledTimeline() {
  const events = [
    { status: "Issue Reported", date: "15/10/2020 10:30", color: "#9C27B0" },
    { status: "Issue Pending", date: "15/10/2020 14:00", color: "#673AB7" },
    { status: "Work In Progress", date: "15/10/2020 14:00", color: "#3B82F6" },
    { status: "Resolved", date: "15/10/2020 16:15", color: "#22C55E" },
  ];

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
    <div className="bg-surface-dark p-4">
      <Timeline
        value={events}
        opposite={(item) => (
          <div>
            <p className="text-sm text-slate-400">{item.date}</p>
          </div>
        )}
        content={(item) => (
          <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
            <p className="text-slate-300 text-sm">{item.status}</p>
          </div>
        )}
        marker={customizedMarker}
      />
    </div>
  );
}
