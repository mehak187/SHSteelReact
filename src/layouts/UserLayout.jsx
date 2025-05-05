import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <div className="p-2 h-[calc(100dvh-83px)] bg-[#F4F5FA]">
        <div className="py-5 max-h-full overflow-y-auto">
          <div className="mycontainer">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
