import React, { useEffect, useRef, useState } from "react";
import selectbg from "../../assets/images/selectbg.png";
import selectbgwhite from "../../assets/images/selectbgwhite.png";

export default function ColorSelect({
  options = [],
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    onChange(option);
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
        className={`border rounded-[6px] block w-full p-3 pe-6 text-sm ${
          error ? "border-red-500" : "border-[#2E263D38]"
        } bg-no-repeat cursor-pointer ${
          !value ? "text-[#2E263D66]" : "text-white"
        }`}
        style={{
          backgroundImage: `url(${value ? selectbgwhite : selectbg})`,
          backgroundSize: "10px",
          backgroundPosition: "calc(100% - 10px)",
          backgroundColor: value ? value.color : "",
        }}
      >
        <p className="line-clamp-1">
          {!value ? placeholder || "Select" : value.label}
        </p>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 border rounded-[6px] border-[#2E263D38] bg-[#ECECEC] z-[10] max-h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-2 p-2">
            {options.map((option) => (
              <div
                key={option.label}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer hover:opacity-70 rounded-[6px] overflow-hidden ${
                  value?.label === option.label ? "border" : ""
                }`}
              >
                <div
                  className="text-white p-2"
                  style={{ backgroundColor: option.color }}
                >
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
