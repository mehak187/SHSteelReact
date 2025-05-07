import React from "react";
import FavouriteButton from "./FavouriteButton";
import dummyuser from "../../assets/images/dummy-user.png";
import { FiTrash } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";

export default function Notification({ data }) {
  return (
    <div
      className={`group p-4 border-b border-[#2E263D1F] flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 hover:shadow-[0px_3px_6px_0px_#2E263D2E] ${
        data.isread ? "bg-white" : "bg-[#2E263D0A]"
      }`}
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <input
            className="size-[18px] accent-[#88191F]"
            type="checkbox"
            name=""
            id=""
          />
          <FavouriteButton isfav={data.isliked} />
        </div>
        <div className="flex items-center gap-2">
          <img className="size-8 rounded-full" src={data.img} alt="img" />
          <p className="text-sm text-[#2E263D66] line-clamp-2">
            <span className="font-medium text-[#2E263DE5]">{data.name}</span>{" "}
            {data.message}
          </p>
        </div>
      </div>
      <div className="group-hover:hidden ms-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {data.tag.map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: item }}
                className="size-2 rounded-full"
              ></div>
            ))}
          </div>
          <p className="text-sm text-nowrap text-[#2E263D66]">{data.time}</p>
        </div>
      </div>
      <div className="hidden group-hover:block ms-auto">
        <div className="flex items-center gap-3">
          <button className="text-xl text-[#2E263DB2]">
            <FiTrash />
          </button>
          <button className="text-xl text-[#2E263DB2]">
            <FaRegEnvelope />
          </button>
          <button className="text-xl text-[#2E263DB2]">
            <BsExclamationCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
