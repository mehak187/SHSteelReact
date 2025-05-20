import React, { useState } from "react";
import Actions from "../Actions";
import EditIcon from "../customicons/EditIcon";
import DeleteIcon from "../customicons/DeleteIcon";
import Table from "../Table";
import WritePercentage from "./WritePercentage";
import AddHours from "./AddHours";

export default function OrderTable() {
    const [open, setOpen] = useState(false);
    const [Isopen, IssetOpen] = useState(false);

    const tableHeader = ["", "No", "Project Name", "%Allocate", "HRS", "Action"];
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
            <p className="text-[#8C57FF]">{item.no}</p>,
            item.name,
            <div>
                <input type="text" name="" id="" className="w-[300px] border p-2 rounded-lg border-[#2E263D38]" placeholder="Write" readOnly onClick={()=>setOpen(true)} />
            </div>,
            <div>
                <input type="text" name="" id="" className="w-[300px] border p-2 rounded-lg border-[#2E263D38]" placeholder="Write" readOnly onClick={()=>IssetOpen(true)}/>
            </div>,
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
                    <Table rows={tableRows} headers={tableHeader} />
                </div>
            </div>
            <WritePercentage open={open} onOpenChange={setOpen}/>
            <AddHours Isopen={Isopen} IsonOpenChange={IssetOpen}/>
        </div>
    );
}
