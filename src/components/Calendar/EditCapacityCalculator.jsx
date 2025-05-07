import React, { useState } from "react";
import removeIcon from "../../assets/images/removeIcon.png";
import addIcon from "../../assets/images/addIcon.png";

export default function EditCapacityCalculator() {
  const [inputs, setInputs] = useState([
    "804",
    "Fabricator",
    "Parts",
    "Fitting",
    "Welding",
  ]);

  const handleAdd = () => {
    setInputs([...inputs, ""]);
  };

  const handleRemove = (index) => {
    const updated = [...inputs];
    updated.splice(index, 1);
    setInputs(updated);
  };

  const handleChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };
  return (
    <div className="bg-white rounded-[6px] py-2">
      <div className="max-h-[calc(100dvh-48px)] overflow-y-auto scroll-y-hidden">
        <div className="p-4 border-b border-[#2E263D1F] ">
          <p className="text-xl font-medium">
            Edit Capacity Calculator/ Machinary
          </p>
        </div>
        <div className="flex flex-col gap-4 p-4">
          {inputs.map((input, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                className="border rounded-[6px] block w-full p-3 text-sm border-[#2E263D38] placeholder:text-[#2E263D66]"
                type="text"
                value={input}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button onClick={() => handleRemove(index)}>
                <img className="size-5" src={removeIcon} alt="delete" />
              </button>
            </div>
          ))}
          <div>
            <button onClick={handleAdd}>
              <img className="size-10" src={addIcon} alt="add" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
