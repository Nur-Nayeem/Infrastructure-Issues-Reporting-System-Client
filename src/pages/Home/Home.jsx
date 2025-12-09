import React from "react";
import HeroBanner from "../../components/HeroBaner/HeroBanner";
import LatestResolvedIssues from "../../components/LatestResolvedIssues/LatestResolvedIssues";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <main className="max-w-7xl mx-auto">
        <LatestResolvedIssues />
      </main>
    </div>
  );
};

export default Home;
