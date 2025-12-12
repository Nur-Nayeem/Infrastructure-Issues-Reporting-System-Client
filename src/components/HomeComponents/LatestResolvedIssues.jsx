import React, { useEffect, useState } from "react";
import LatestSolvedIssueCard from "../cards/IssueSolveCard";
import axios from "axios";
import IssueMainCard from "../cards/IssueMainCard";

const ISSUES_DATA = [
  {
    id: 1,
    title: "Pothole on Main Street",
    status: "Resolved",
    statusColor: "success",
    type: "Pothole",
    location: "Mirpur-2",
    priority: "Normal",
    votes: 128,
    img: "/hole_on_the_road.png",
  },
  {
    id: 2,
    title: "Broken Streetlight",
    status: "Resolved",
    statusColor: "success",
    type: "Streetlight",
    location: "Mirpur-12",
    priority: "High",
    isHighPriority: true,
    votes: 96,
    img: "/hole_on_the_road.png",
  },
  {
    id: 3,
    title: "Graffiti on Park Wall",
    status: "Resolved",
    statusColor: "success",
    type: "Vandalism",
    location: "Mirpur-1",
    priority: "Normal",
    votes: 74,
    img: "/hole_on_the_road.png",
  },
  {
    id: 4,
    title: "Damaged Sidewalk",
    status: "In Progress",
    statusColor: "info",
    type: "Sidewalk",
    location: "Mirpur-11",
    priority: "High",
    isHighPriority: true,
    isBoosted: true,
    votes: 215,
    img: "/hole_on_the_road.png",
  },
  {
    id: 5,
    title: "Overgrown Park Area",
    status: "In Progress",
    statusColor: "info",
    type: "Maintenance",
    location: "Mirpur-1",
    priority: "Normal",
    votes: 42,
    img: "/hole_on_the_road.png",
  },
  {
    id: 6,
    title: "Leaking Fire Hydrant",
    status: "Reported",
    statusColor: "warning",
    type: "Water Leak",
    location: "Mirpur-10",
    priority: "High",
    isHighPriority: true,
    votes: 18,
    img: "/hole_on_the_road.png",
  },
];

const LatestResolvedIssues = () => {
  const [latesSolved, setLatesSolved] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/issues?status=Resolved&limit=6")
      .then((res) => setLatesSolved(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl font-display font-semibold tracking-tight">
          Latest Resolved Issues
        </h2>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Recent issues addressed by our dedicated teams, thanks to community
          reports.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {latesSolved.map((issue) => (
          <IssueMainCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default LatestResolvedIssues;
