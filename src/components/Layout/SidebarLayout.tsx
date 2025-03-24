import React from "react";
import Sidebar from "./Nav/Sidebar";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default SidebarLayout;
