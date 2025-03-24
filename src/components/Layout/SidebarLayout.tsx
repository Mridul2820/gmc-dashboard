import React from "react";
import Sidebar from "./Nav/Sidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen text-black">
      <Sidebar />
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </div>
  );
};

export default SidebarLayout;
