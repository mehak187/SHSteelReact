import React from "react";
import {
  FaArrowsRotate,
  FaEllipsisVertical,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import Notification from "./notifications/Notification";
import dummyuser from "../assets/images/dummy-user.png";

export default function Notifications() {
  const notifications = [
    {
      isread: false,
      isliked: true,
      img: dummyuser,
      name: "Tommy Sicilia",
      message: "New Projects Added",
      tag: ["#8C57FF", "#FF4C51"],
      time: "01:16 PM",
    },
    {
      isread: false,
      isliked: false,
      img: dummyuser,
      name: "Tressa Gass",
      message: "New Project manager Added",
      tag: ["#FF4C51"],
      time: "01:25 PM",
    },
    {
      isread: true,
      isliked: false,
      img: dummyuser,
      name: "Waldemar Mannering",
      message: "New Project manager Added",
      tag: ["#FF4C51"],
      time: "04:32 PM",
    },
    {
      isread: false,
      isliked: false,
      img: dummyuser,
      name: "Tressa Gass",
      message: "New Project manager Added",
      tag: ["#FF4C51"],
      time: "01:25 PM",
    },
    {
      isread: false,
      isliked: false,
      img: dummyuser,
      name: "Tressa Gass",
      message: "New Project manager Added",
      tag: ["#FF4C51"],
      time: "01:25 PM",
    },
    {
      isread: true,
      isliked: false,
      img: dummyuser,
      name: "Waldemar Mannering",
      message: "New Project manager Added",
      tag: ["#FF4C51"],
      time: "04:32 PM",
    },
    {
      isread: false,
      isliked: false,
      img: dummyuser,
      name: "Tressa Gass",
      message: "New Project manager Added",
      tag: ["#FF4C51"],
      time: "01:25 PM",
    },
  ];
  return (
    <div>
      <div className="p-4 flex items-center gap-2 border-b border-[#2E263D1F]">
        <label htmlFor="searchnotification">
          <FaMagnifyingGlass />
        </label>
        <input
          type="search"
          name="searchnotification"
          id="searchnotification"
          className="text-sm placeholder:text-[#2E263D66] w-full"
          placeholder="Notifications"
        />
      </div>
      <div className="p-4 flex items-center justify-end gap-2 border-b border-[#2E263D1F] text-[#2E263DB2]">
        <button className="text-lg">
          <FaArrowsRotate />
        </button>
        <button className="text-lg">
          <FaEllipsisVertical />
        </button>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {notifications.map((item, index) => (
          <Notification key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
