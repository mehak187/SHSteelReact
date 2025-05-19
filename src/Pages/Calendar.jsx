import React, { useState } from "react";
import AddNewProject from "../components/Calendar/AddNewProject";
import { Modal } from "@mui/material";
import TabComponent from "../components/TabComponent";
import CalendarComponent from "../components/Calendar/CalendarComponent";
import CapacityCalculator from "../components/Calendar/CapacityCalculator";

export default function Calendar() {
  const [open, setOpen] = useState(false);

  const tabData = [
    { label: "Calendar", content: <CalendarComponent/> },
    { label: "Capacity Calculator", content: <CapacityCalculator/> },
  ];
  return (
    <div>
      <div >
          <TabComponent tabs={tabData} />
      </div>
      <AddNewProject open={open} onOpenChange={setOpen} />
    </div>
  );
}
