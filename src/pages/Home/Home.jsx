import React from "react";
import HeroBanner from "../../components/HeroBaner/HeroBanner";
import LatestResolvedIssues from "../../components/HomeComponents/LatestResolvedIssues";
import HowItWorks from "../../components/HomeComponents/HowItWorks";
import OurCommitMent from "../../components/HomeComponents/OurCommitMent";
import FrequentlyAskedQn from "../../components/HomeComponents/FrequentlyAskedQn";
import Features from "../../components/HomeComponents/Features";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <main className="container mx-auto">
        <LatestResolvedIssues />
        <Features />
        <HowItWorks />
        <OurCommitMent />
        <FrequentlyAskedQn />
      </main>
    </div>
  );
};

export default Home;
