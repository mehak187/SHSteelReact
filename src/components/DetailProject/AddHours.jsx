import * as React from "react";
import Modal from "@mui/material/Modal";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function AddHours({ Isopen, IsonOpenChange }) {
  const navigate = useNavigate();
  return (
    <div>
      <Modal
        open={Isopen}
        onClose={IsonOpenChange}
        aria-labelledby="add-manager-modal"
        aria-describedby="modal-to-add-new-manager"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[450px]">
          <form action="">
            <div className="h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 justify-between p-3 border-b border-[#2E263D1F]">
                <p className="text-lg font-medium text-[#2E263DE5]">
                  Add Hours
                </p>
              </div>
              <div className="p-2 m-1 h-[calc(100%-120px)] overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div>
                    <input
                      type="text"
                      name="hour"
                      id="hour"
                      className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                      placeholder="Add Hour"
                    />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center gap-3">
                <button
                  type="submit"
                  className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
                >
                  Continue
                </button>
                <button
                  onClick={IsonOpenChange}
                  className="text-[#88191F] text-sm font-medium bg-white border border-[#88191F] rounded-[6px] py-2 px-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
