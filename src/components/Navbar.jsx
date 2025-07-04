import React, { useEffect, useRef, useState } from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import logo from "../assets/images/Logo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { PiBellBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { persistor } from "../redux/store";
import { getInitials } from "../utils/getInitails";

export default function Navbar() {
  const [shownav, setshownav] = useState(false);
  const [shownotification, setshownotification] = useState(false);
  const navRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    persistor.purge();
    handleClose();
    navigate("/");
  };

  const initials = getInitials(userData?.name);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setshownav(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setshownotification(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation();
  const Links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Calendar", path: "/calendar" },
    { label: "Managers", path: "/managers" },
    { label: "Project Coordinators", path: "/projectcoordinators" },
    { label: "Completed Projects", path: "/completedproject" },
  ];
  const NavLinks = () => (
    <div ref={navRef} className={`${shownav ? "block" : "hidden"} lg:block`}>
      <ul
        className={`flex gap-x-4 gap-y-2 absolute lg:static top-full left-0 flex-col lg:flex-row w-full lg:w-auto bg-[#565654] lg:bg-white p-4 lg:p-0`}
      >
        {Links.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`p-2 border border-[#56565445] rounded-[5px] font-medium text-sm min-w-[100px] inline-flex lg:flex lg:items-center lg:justify-center text-nowrap ${
                location.pathname.toLowerCase() === item.path.toLowerCase()
                  ? "text-[#565654] bg-white lg:text-white lg:bg-[#565654]"
                  : "text-white bg-[#565654] lg:text-[#565654] lg:bg-white"
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
    <div className="bg-white relative z-20">
      <div className="mycontainer">
        <nav
          className={`py-3 flex items-center gap-6 lg:gap-8 xl:gap-20 ${
            shownotification && "relative"
          }`}
        >
          <div className="lg:max-w-[80px] max-w-[60px]">
            <Link to="/dashboard">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="w-[calc(100%-250px)] flex items-center gap-6">
            <div>
              <NavLinks />
            </div>
            <div className="hidden xl:block w-full max-w-[400px]">
              <div className="border border-[#56565445] flex items-center gap-2 px-3 py-1.5 rounded-[5px]">
                <IoSearch />
                <input
                  type="text"
                  placeholder="Search..."
                  className=" rounded-lg focus:outline-none w-full "
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 ms-auto">
            <button
              onClick={() => setshownotification(true)}
              className="relative"
            >
              <PiBellBold className="text-xl text-[#2E263DE5]" />
              <div
                className={`size-3 absolute rounded-full border-3 border-[#F4F5FA] bg-[#FF4C51] top-[-6px] right-0`}
              ></div>
            </button>
            <button
              onClick={handleClick}
              className="rounded-full w-max relative"
            >
              <Avatar
                sx={{
                  bgcolor: "#88191F",
                  width: 40,
                  height: 40,
                  fontSize: "1rem",
                }}
              >
                {initials}
              </Avatar>
              <div
                className={`size-3 absolute rounded-full border-3 border-[#F4F5FA] bg-[#56CA00] bottom-0 right-0`}
              ></div>
            </button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                elevation: 3,
                sx: { mt: 1, minWidth: 120 },
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <button
              onClick={() => setshownav((prev) => !prev)}
              className="lg:hidden"
            >
              {shownav ? (
                <FaXmark className="text-xl text-[#2E263DE5]" />
              ) : (
                <FaBars className="text-xl text-[#2E263DE5]" />
              )}
            </button>
          </div>
          {shownotification && (
            <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-10"></div>
          )}
          {shownotification && (
            <div
              ref={notificationRef}
              className="absolute z-20 top-[calc(100%+10px)] right-0 bg-white rounded-[6px] w-full max-w-[800px]"
            >
              <Notifications />
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
