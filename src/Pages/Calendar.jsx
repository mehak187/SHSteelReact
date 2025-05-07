import React, { useState } from "react";
import AddNewProject from "../components/Calendar/AddNewProject";
import { Modal } from "@mui/material";
import EditCapacityCalculator from "../components/Calendar/EditCapacityCalculator";

export default function Calendar() {
  const [open, setOpen] = useState(false);
  const [modalopen, setmodalopen] = useState(false);
  const handlemodalopen = () => setmodalopen(true);
  const handlemodalclose = () => setmodalopen(false);
  return (
    <div>
      <button
        className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
        onClick={() => setOpen(true)}
      >
        Add New Project
      </button>
      <div className="mt-4">
        <button
          onClick={handlemodalopen}
          className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
        >
          Edit Capacity Calculator
        </button>
      </div>
      <AddNewProject open={open} onOpenChange={setOpen} />
      <Modal
        open={modalopen}
        onClose={handlemodalclose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full max-w-[500px] outline-0">
          <EditCapacityCalculator />
        </div>
      </Modal>
    </div>
  );
}
