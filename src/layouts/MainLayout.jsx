import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="font-sans bg-background-dark text-slate-300 min-h-screen">
      <div className="flex h-full w-full grow flex-col">
        <header className="sticky top-0 z-50 w-full flex items-center justify-center  border-b border-solid border-slate-800/80 bg-background-dark/80 px-4 md:px-10 py-4 backdrop-blur-md">
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
