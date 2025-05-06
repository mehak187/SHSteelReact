import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { FaXmark } from "react-icons/fa6";

export default function AddCoordinator({ open, onOpenChange }) {
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
              Add New Project coordinator
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
                  name="CoordinatorName"
                  id="CoordinatorName"
                  className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                  placeholder="Coordinator Name"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="CoordinatorEmail"
                  id="CoordinatorEmail"
                  className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                  placeholder="Coordinator Email"
                />
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
              Discard
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
