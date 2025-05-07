import React, { useEffect, useRef, useState } from "react";
import selectbg from "../../assets/images/selectbg.png";

export default function SingleSelect({ options = [], placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="w-full relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`border rounded-[6px] block w-full p-3 pe-6 text-sm border-[#2E263D38] bg-no-repeat cursor-pointer ${
          !selected ? "text-[#2E263D66]" : ""
        }`}
        style={{
          backgroundImage: `url(${selectbg})`,
          backgroundSize: "10px",
          backgroundPosition: "calc(100% - 10px)",
        }}
      >
        <p className="line-clamp-1">
          {!selected ? placeholder || "Select" : selected}
        </p>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 border rounded-[6px] border-[#2E263D38] bg-[#ECECEC] z-[10] max-h-[300px] overflow-y-auto">
          <div className="flex flex-col">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className={`p-2 border-b border-[#8282801C] text-[#828280] cursor-pointer hover:bg-[#dcdcdc] ${
                  selected === option ? "bg-[#d1d1d1]" : ""
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
