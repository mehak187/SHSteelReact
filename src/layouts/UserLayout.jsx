import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserLayout() {
  return (
    <div className="relative">
      <Navbar />
      <div className="p-2 h-[calc(100dvh-83px)] bg-[#F4F5FA]">
        <div className="py-5 h-full overflow-y-auto">
          <div className="mycontainer h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
