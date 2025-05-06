import React, { useState } from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import logo from "../assets/images/Logo.jpg";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import dummyuser from "../assets/images/dummy-user.png";
import { PiBellBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";

export default function Navbar() {
  const [shownav, setshownav] = useState(false);
  const location = useLocation();
  const Links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Calendar", path: "/calendar" },
    { label: "Managers", path: "/managers" },
    { label: "Project Coordinators", path: "/projectcoordinators" },
  ];
  const NavLinks = () => (
    <div className={`${shownav ? "block" : "hidden"} md:block`}>
      <ul
        className={`flex gap-x-4 gap-y-2 absolute md:static top-full left-0 flex-col md:flex-row w-full md:w-auto bg-[#565654] md:bg-white p-4 md:p-0`}
      >
        {Links.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`p-2 border border-[#56565445] rounded-[5px] font-medium text-sm min-w-[100px] inline-flex md:flex md:items-center md:justify-center text-nowrap ${
                location.pathname.toLowerCase() === item.path.toLowerCase()
                  ? "text-[#565654] bg-white md:text-white md:bg-[#565654]"
                  : "text-white bg-[#565654] md:text-[#565654] md:bg-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-white relative">
      <div className="mycontainer">
        <nav className="py-3 flex items-center gap-6 lg:gap-10">
          <div className="max-w-[80px]">
            <img src={logo} alt="Logo" />
          </div>
          <div className="w-[calc(100%-250px)] flex items-center gap-6">
            <div>
              <NavLinks />
            </div>
            <div className="hidden lg:block w-full max-w-[400px]">
              <div className="border border-[#56565445] flex items-center gap-2 px-3 py-1.5 rounded-[5px]">
                <IoSearch />
                <input
                  type="text"
                  placeholder="Search..."
                  className=" rounded-md focus:outline-none w-full "
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 ms-auto">
            <button className="relative">
              <PiBellBold className="text-xl text-[#2E263DE5]" />
              <div
                className={`size-3 absolute rounded-full border-3 border-[#F4F5FA] bg-[#FF4C51] top-[-6px] right-0`}
              ></div>
            </button>
            <button className="rounded-full w-max relative">
              <img
                className="size-10 max-w-10 rounded-full"
                src={dummyuser}
                alt="user"
              />
              <div
                className={`size-3 absolute rounded-full border-3 border-[#F4F5FA] bg-[#56CA00] bottom-0 right-0`}
              ></div>
            </button>
            <button
              onClick={() => setshownav((prev) => !prev)}
              className="md:hidden"
            >
              {shownav ? (
                <FaXmark className="text-xl text-[#2E263DE5]" />
              ) : (
                <FaBars className="text-xl text-[#2E263DE5]" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
