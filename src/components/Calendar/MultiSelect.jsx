import React, { useEffect, useRef, useState } from "react";
import selectbg from "../../assets/images/selectbg.png";

export default function MultiSelect({ options = [], placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef();
  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
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
        className={`border rounded-[6px] block w-full p-3 pe-6 text-sm border-[#2E263D38] bg-no-repeat ${
          selected.length === 0 ? "text-[#2E263D66]" : ""
        }`}
        style={{
          backgroundImage: `url(${selectbg})`,
          backgroundSize: "10px",
          backgroundPosition: "calc(100% - 10px)",
        }}
      >
        <p className="line-clamp-1">
          {selected.length === 0
            ? placeholder || "Select"
            : selected.join(", ")}
        </p>
      </div>
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 border rounded-[6px] border-[#2E263D38] bg-[#ECECEC] z-[10] max-h-[300px] overflow-y-auto">
          <div className="flex flex-col">
            {options.map((option) => (
              <label
                key={option}
                className="flex item gap-2 border-b border-[#8282801C] text-[#828280] p-2 hover:bg-[#dcdcdc] cursor-pointer"
              >
                <input
                  className="size-5 accent-[#88191F]"
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
