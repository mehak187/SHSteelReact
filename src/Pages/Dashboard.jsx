import React from "react";
import managers from "../assets/images/Managers.png";
import Coordinators from "../assets/images/Coordinators.png";
import TotalProjects from "../assets/images/TotalProjects.png";
import CompletedProjects from "../assets/images/CompletedProjects.png";
import Table from "../components/Table";
import dummyuser from "../assets/images/dummy-user.png";
import PageTitle from "../components/PageTitle";
import TableMui from "../components/mui/TableMui";
import { useGetDashboardQuery } from "../api/apiComponents/dasboardApi";
import Loader from "../components/Loader/Loader";

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery();
  const cards = [
    {
      img: managers,
      title: "Managers",
      value: data?.total_managers || 0,
      percent: "(+2%)",
      endnote: "Total Managers",
      type: "safe",
    },
    {
      img: Coordinators,
      title: "Total Coordinators",
      value: data?.total_coordinators || 0,
      percent: "(+18%)",
      endnote: "Curent year analytics",
      type: "safe",
    },
    {
      img: TotalProjects,
      title: "Total Projects",
      value: data?.total_projects || 0,
      percent: "(-14%)",
      endnote: "Last year analytics",
      type: "danger",
    },
    {
      img: CompletedProjects,
      title: "Completed Projects",
      value: data?.completed_projects || 0,
      percent: "(+42%)",
      endnote: "Last months analytics",
      type: "safe",
    },
    {
      img: CompletedProjects,
      title: "Ongoing Projects",
      value: data?.active_projects || 0,
      percent: "(+42%)",
      endnote: "Last week analytics",
      type: "safe",
    },
  ];

  const tabledata = [
    {
      img: dummyuser,
      name: "Orangewood",
      date: "April 12, 2024",
      totalhour: "122/240",
      percent: 20,
      remainingHour: "18:42",
      remainingPound: "125",
    },
    {
      img: dummyuser,
      name: "Findlay Hyundai Prescott",
      date: "April 12, 2024",
      totalhour: "9/56",
      percent: 40,
      remainingHour: "20:42",
      remainingPound: "125",
    },
    {
      img: dummyuser,
      name: "Orangewood",
      date: "April 12, 2024",
      totalhour: "122/240",
      percent: 60,
      remainingHour: "18:42",
      remainingPound: "125",
    },
    {
      img: dummyuser,
      name: "Findlay Hyundai Prescott",
      date: "April 12, 2024",
      totalhour: "9/56",
      percent: 80,
      remainingHour: "20:42",
      remainingPound: "125",
    },
  ];

  return (
    <div>
      <PageTitle title="dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-[6px] shadow-[0px_4px_10px_0px_#2E263D33]"
          >
            <div className="flex gap-2 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm">{item.title}</p>
                <div className="flex items-baseline gap-2">
                  <p className="font-medium text-2xl">{item.value}</p>
                  <p
                    className={`text-sm ${
                      item.type === "danger"
                        ? "text-[#FF4C51]"
                        : "text-[#56CA00]"
                    }`}
                  >
                    {item.percent}
                  </p>
                </div>
                <p className="text-xs">{item.endnote}</p>
              </div>
              <div>
                <img className="size-9 max-w-9" src={item.img} alt="img" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white rounded-[6px] overflow-hidden shadow-[0px_4px_10px_0px_#2E263D33] lg:w-4/5">
        <div className="p-5 sm:flex items-center gap-3 justify-between">
          <div>
            <p className="font-medium text-lg text-[#2E263DE5]">Project List</p>
          </div>
          <div className="flex justify-end sm:mt-0 mt-3">
            <input
              className="border border-[#2E263D38] p-2 outline-0 text-sm rounded-[6px]"
              placeholder="Search Project"
              type="search"
              name="searchProject"
              id="searchProject"
            />
          </div>
        </div>
        <div className="pb-2">
          <TableMui
            loading={false}
            th={{
              name: "PROJECT",
              totalhour: "TOTAL Hour",
              percent: "PROGRESS",
              remainingHour: "Remaining HOURS",
              remainingPound: "Remaining Pounds",
            }}
            td={tabledata || []}
            customFields={[
              {
                name: "name",
                data: (value, data) => (
                  <div className="flex items-center gap-2">
                    <img
                      className="size-8 max-w-8 rounded-full"
                      src={data.img}
                      alt="img"
                    />
                    <div>
                      <p className="font-medium text-sm text-[#2E263DE5]">
                        {data.name}
                      </p>
                      <p className="text-sm text-[#2E263DB2]">{data.date}</p>
                    </div>
                  </div>
                ),
              },
              {
                name: "percent",
                data: (value, item) => (
                  <div>
                    <p className="text-[#2E263DB2]">{item.percent}%</p>
                    <div
                      className={`w-full h-2 rounded-full mt-1 ${
                        item.percent < 25
                          ? "bg-[#FF4C5129]"
                          : item.percent >= 25 && item.percent < 50
                          ? "bg-[#FFB40029]"
                          : item.percent >= 50 && item.percent < 75
                          ? "bg-[#8C57FF29]"
                          : item.percent >= 75
                          ? "bg-[#56CA0029]"
                          : ""
                      }`}
                    >
                      <div
                        className={`h-full bg-[#2E263D] rounded-full ${
                          item.percent < 25
                            ? "bg-[#FF4C51]"
                            : item.percent >= 25 && item.percent < 50
                            ? "bg-[#FFB400]"
                            : item.percent >= 50 && item.percent < 75
                            ? "bg-[#8C57FF]"
                            : item.percent >= 75
                            ? "bg-[#56CA00]"
                            : ""
                        }`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ),
              },
              {
                name: "status",
                data: (value, data) => (
                  <div className="flex items-center gap-1">
                    <p
                      className={`w-[80px] p-1 text-center rounded-[4px] font-medium ${
                        data.status === "Active"
                          ? "text-[#039A08] bg-[#E6FEEE]"
                          : "text-[#FF060A] bg-[#FEF0F1]"
                      }`}
                    >
                      {data.status}
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <Loader loading={isLoading} />
      </div>
    </div>
  );
}
