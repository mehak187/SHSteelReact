import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import EllipsisIcon from "./customicons/EllipsisIcon";

export default function Actions({ rowIndex, list }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `row-actions-${rowIndex}` : undefined;

  return (
    <>
      <button aria-describedby={id} onClick={handleClick} size="small">
        <EllipsisIcon className="text-lg" />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="flex flex-col gap-1 min-w-[150px] p-2">
          {list.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  handleClose();
                }}
                className={`flex items-center gap-3 p-2 hover:bg-[#FAFAFA] rounded-[4px] text-sm ${
                  item.isdelete ? "text-[#DD1324]" : ""
                }`}
              >
                <Icon className="text-xl" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </Popover>
    </>
  );
}
