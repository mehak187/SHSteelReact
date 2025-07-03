import React, { useState } from "react";
import Table from "../components/Table";
import dummyuser from "../assets/images/dummy-user.png";
import { FaEllipsisVertical } from "react-icons/fa6";
import Addmanager from "../components/Manager/Addmanager";
import PageTitle from "../components/PageTitle";
import TableMui from "../components/mui/TableMui";

export default function Managers() {
  const [open, setOpen] = useState(false);

  const tabledata = [
    {
      no: "#6979",
      date: "Apr 15, 2023",
      time: "10:21",
      img: dummyuser,
      name: "Orangewood",
      email: "ceasomw@theguardian.com",
      status: "Active",
    },
    {
      no: "#6979",
      date: "Apr 15, 2023",
      time: "10:21",
      img: dummyuser,
      name: "Findlay Hyundai Prescott",
      email: "ceasomw@theguardian.com",
      status: "Active",
    },
    {
      no: "#6979",
      date: "Apr 15, 2023",
      time: "10:21",
      img: dummyuser,
      name: "Orangewood",
      email: "ceasomw@theguardian.com",
      status: "Active",
    },
    {
      no: "#6979",
      date: "Apr 15, 2023",
      time: "10:21",
      img: dummyuser,
      name: "Findlay Hyundai Prescott",
      email: "ceasomw@theguardian.com",
      status: "Not Active",
    },
  ];

  return (
    <div className="h-full">
      <PageTitle title="Managers" />
      <div className="bg-white rounded-[6px] overflow-hidden min-h-full shadow-[0px_4px_10px_0px_#2E263D33]">
        <div className="p-5">
          <div className="sm:flex justify-between items-center gap-3">
            <div>
              <input
                className="border border-[#2E263D38] p-2 outline-0 text-sm rounded-[6px] w-full"
                placeholder="Search Project"
                type="search"
                name="searchProject"
                id="searchProject"
              />
            </div>
            <div className="flex justify-end sm:mt-0 mt-3">
              <button
                className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
                onClick={() => setOpen(true)}
              >
                Add Manager
              </button>
            </div>
          </div>
        </div>
        <div className="pb-2">
          <TableMui
            loading={false}
            th={{
              checkbox: "",
              no: "No",
              date: "Date",
              name: "Manager Name",
              status: "status",
              action: "Action",
            }}
            td={tabledata || []}
            customFields={[
              {
                name: "checkbox",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <input
                      className="size-4 accent-[#88191F]"
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </div>
                ),
              },
              {
                name: "date",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <p className="text-[#2E263DB2]">
                      {item.date}, {item.time}
                    </p>
                  </div>
                ),
              },
              {
                name: "name",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <img
                      className="size-8 max-w-8 rounded-full"
                      src={item.img}
                      alt="img"
                    />
                    <div>
                      <p className="font-medium text-sm text-[#2E263DE5]">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#2E263DB2]">{item.email}</p>
                    </div>
                  </div>
                ),
              },
              {
                name: "no",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <p className="text-[#8C57FF]">{item.no}</p>
                  </div>
                ),
              },

              {
                name: "status",
                data: (value, item) => (
                  <div className="flex items-center gap-1">
                    <p
                      className={`inline-block text-xs py-1 px-3 rounded-full ${
                        item.status === "Active"
                          ? "text-[#56CA00] bg-[#56CA0029]"
                          : "text-[#8C57FF] bg-[#8C57FF29]"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                ),
              },
              {
                name: "action",
                data: (value, item) => (
                  <div className="flex items-center gap-1">
                    <button>
                      <FaEllipsisVertical />
                    </button>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <Addmanager open={open} onOpenChange={setOpen} />
    </div>
  );
}
