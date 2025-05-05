import React from "react";

const Table = ({ headers = [], rows = [] }) => {
  return (
    <div className="overflow-x-auto pb-2">
      <table className="w-full text-nowrap border-separate border-spacing-0">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                className="text-left p-4 text-sm font-medium bg-[#F6F7FB] text-[#2E263DE5]"
                key={index}
              >
                <div className="flex items-center gap-2 justify-between">
                  <p className="uppercase">{header}</p>
                  <div className="bg-[#2E263D1F] w-[2px] h-[12px]"></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    className={`text-[#2E263DE5] text-sm py-2 px-4 border-b border-[#2E263D1F]`}
                    key={cellIndex}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr key="no-data">
              <td className="p-4 bg-white" colSpan={headers.length}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
