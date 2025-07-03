import React, { useState } from "react";
import Actions from "../Actions";
import EditIcon from "../customicons/EditIcon";
import DeleteIcon from "../customicons/DeleteIcon";
import Table from "../Table";
import WritePercentage from "./WritePercentage";
import AddHours from "./AddHours";
import TableMui from "../mui/TableMui";

export default function OrderTable() {
  const [open, setOpen] = useState(false);
  const [Isopen, IssetOpen] = useState(false);

  const tabledata = [
    {
      no: "#6979",
      name: "Orangewood",
    },
    {
      no: "#6979",
      name: "Findlay Hyundai Prescott",
    },
    {
      no: "#6979",
      name: "Orangewood",
    },
    {
      no: "#6979",
      name: "Findlay Hyundai Prescott",
    },
  ];

  return (
    <div className="h-full">
      <div className="bg-white rounded-[6px] overflow-hidden min-h-full shadow-[0px_4px_10px_0px_#2E263D33]">
        <div className="pb-2">
          <TableMui
            loading={false}
            th={{
              checkbox: "",
              name: "Project Name",
              allocate: "%Allocate",
              hrs: "HRS",
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
                name: "allocate",
                data: (value, item) => (
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
                  </div>
                ),
              },
              {
                name: "hrs",
                data: (value, item) => (
                  <div className="flex items-center gap-2">
                    <div>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="w-[300px] border p-2 rounded-lg border-[#2E263D38]"
                        placeholder="Write"
                        readOnly
                        onClick={() => IssetOpen(true)}
                      />
                    </div>
                  </div>
                ),
              },
              {
                name: "action",
                data: (value, item) => (
                  <div className="flex items-center gap-1">
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
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
      <WritePercentage open={open} onOpenChange={() => setOpen(false)} />
      <AddHours Isopen={Isopen} IsonOpenChange={() => IssetOpen(false)} />
    </div>
  );
}
