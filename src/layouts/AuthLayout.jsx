import React from "react";
import { Outlet } from "react-router-dom";
import LoginImg from "../assets/images/login.png";

const AuthLayout = () => {
  return (
    <div>
      <div className="sm:grid xl:grid-cols-4 md:grid-col-3 sm:grid-cols-2">
        <div className="xl:col-start-1 xl:col-end-4 md:col-start-1 md:col-end-3 sm:block hidden relative">
          <img src={LoginImg} alt="" className="w-full h-dvh object-cover" />
          <div className="absolute bg-[#FFFFFF1F] h-[40%] w-full bottom-0 clip"></div>
        </div>
        <div className="xl:col-start-4 xl:col-end-5 md:col-start-3 md:col-end-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
