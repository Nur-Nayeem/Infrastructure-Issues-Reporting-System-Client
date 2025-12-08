import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="font-sans bg-background-dark text-slate-300 min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />

          <main>
            <Outlet />
          </main>
          <footer></footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
