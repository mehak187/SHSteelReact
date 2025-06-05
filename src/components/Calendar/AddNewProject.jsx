import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { FaXmark } from "react-icons/fa6";
import MultiSelect from "./MultiSelect";
import SingleSelect from "./SingleSelect";
import ColorSelect from "./ColorSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddNewProject({ open, onOpenChange }) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const selectcoordinators = [
    "Adam",
    "Grawin",
    "Jhons Adams",
    "Christen martin",
    "ALA Mesa Auditorium Building",
    "NAU Skydome",
  ];

  const selectManager = [
    "Shane",
    "Joe",
    "Root",
    "Martin",
    "Adam",
    "NAU Skydome",
  ];

  const colorOptions = [
    { label: "Standard", color: "#56CA00" },
    { label: "Front", color: "#33BBFE" },
    { label: "Back", color: "#FF4C51" },
  ];

  return (
    <div>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "350px",
          },
        }}
        anchor={"right"}
        open={open}
        onClose={() => onOpenChange(false)}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex items-center gap-2 justify-between p-3 border-b border-[#2E263D1F]">
            <p className="text-lg font-medium text-[#2E263DE5]">
              Add New Project
            </p>
            <button onClick={() => onOpenChange(false)}>
              <FaXmark className="text-[#2E263DB2]" />
            </button>
          </div>
          <div className="p-2 m-1 h-[calc(100%-120px)] overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  name="ProjectName"
                  id="ProjectName"
                  className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                  placeholder="Project Name"
                />
              </div>
              <div>
                <SingleSelect
                  placeholder="Select Project Manager"
                  options={selectManager}
                />
              </div>
              <div>
                <MultiSelect
                  options={selectcoordinators}
                  placeholder="Select Project Coordinator"
                />
              </div>
              <div>
                <ColorSelect
                  options={colorOptions}
                  placeholder="Schedule Type"
                />
              </div>
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                  placeholderText="Select Start Date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="DurationWeeks"
                  id="DurationWeeks"
                  className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                  placeholder="Duration Weeks"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium text-lg">Departments</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="Shop"
                    id="Shop"
                    className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                    placeholder="Shop"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Manhrs/week"
                    id="Manhrs/week"
                    className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                    placeholder="Man hrs/ week"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Misc"
                    id="Misc"
                    className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                    placeholder="Misc"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="MiscManhrs/week"
                    id="MiscManhrs/week"
                    className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                    placeholder="Man hrs/ week"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Field"
                    id="Field"
                    className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                    placeholder="Field"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Man hrsManhrs/week"
                    id="Man hrsManhrs/week"
                    className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                    placeholder="Man hrs"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 flex items-center gap-3">
            <button
              type="submit"
              className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
            >
              Add
            </button>
            <button
              type="reset"
              className="text-[#88191F] text-sm font-medium bg-white border border-[#88191F] rounded-[6px] py-2 px-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
