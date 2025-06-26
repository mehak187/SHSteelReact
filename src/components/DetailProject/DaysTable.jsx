import React, { useState } from "react";
import Actions from "../Actions";
import EditIcon from "../customicons/EditIcon";
import DeleteIcon from "../customicons/DeleteIcon";
import Table from "../Table";
import WritePercentage from "./WritePercentage";

export default function DaysTable() {
  const [open, setOpen] = useState(false);
  const tabledata = [
    {
      no: "0",
      name: "Admin",
    },
    {
      no: "0",
      name: "Vacation/Sick",
    },
    {
      no: "0",
      name: "Holiday",
    },
    {
      no: "0",
      name: "Floating Holidays (4)",
    },
  ];

  const tableRows = tabledata.map((item) => {
    return [
      <div>
        <input
          className="size-4 accent-[#88191F]"
          type="checkbox"
          name=""
          id=""
        />
      </div>,
      item.name,
      <div>
        <input
          type="text"
          name=""
          id=""
          className="w-[300px] border p-2 rounded-lg border-[#2E263D38]"
          placeholder="Write"
          readOnly
          onClick={() => setOpen(true)}
        />
      </div>,
      item.no,
      <div>
        <Actions
          list={[
            {
              icon: EditIcon,
              label: "Edit",
            },
            {
              icon: DeleteIcon,
              label: "Delete",
            },
          ]}
        />
      </div>,
    ];
  });
  return (
    <div className="h-full">
      <div className="bg-white rounded-[6px] overflow-hidden min-h-full shadow-[0px_4px_10px_0px_#2E263D33]">
        <div className="pb-2">
          <Table rows={tableRows} />
        </div>
      </div>
      <WritePercentage open={open} setOpen={setOpen} />
    </div>
  );
}
