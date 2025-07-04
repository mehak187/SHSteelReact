import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Loader from "../Loader/Loader";

export default function TableMui({
  th,
  td,
  styleTableTh,
  styleTableContainer,
  styleTableThead,
  headerRounded = false,
  rowRounded = false,
  customFields,
  cellStyles,
  loading,
}) {
  const renderValue = (row, key, index) => {
    if (key === "index") return index + 1;
    const custom = customFields?.find((f) => f.name === key);
    return custom ? custom.data(row[key], row) : row[key];
  };

  return (
    <>
      <TableContainer style={styleTableContainer}>
        <Table aria-label="styled table" style={{ borderCollapse: "separate" }}>
          <TableHead
            sx={{
              backgroundColor: "#f6f7fb",
              ...styleTableThead,

              "& th:first-of-type": {
                borderTopLeftRadius: headerRounded ? "10px" : 0,
                borderBottomLeftRadius: headerRounded ? "10px" : 0,
              },
              "& th:last-of-type": {
                borderTopRightRadius: headerRounded ? "10px" : 0,
                borderBottomRightRadius: headerRounded ? "10px" : 0,
              },
            }}
          >
            <TableRow>
              {Object.entries(th).map(([key, label], index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 500,
                    color: "#000",
                    whiteSpace: "nowrap",
                    borderTop: "1px solid #e3e3e3e3",
                    px: 2,
                    py: 2,
                    fontFamily: "Inter",
                    fontSize: "14px",
                    ...styleTableTh,
                  }}
                >
                  <div className="flex items-center gap-2 justify-between">
                    <p className="uppercase">{label}</p>
                    <div className="bg-[#2E263D1F] w-[2px] h-[12px]"></div>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!loading && (
            <TableBody>
              {td.length > 0 ? (
                td.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      backgroundColor: "#FFFFFF",

                      "& td:first-of-type": {
                        borderTopLeftRadius: rowRounded ? "10px" : 0,
                        borderBottomLeftRadius: rowRounded ? "10px" : 0,
                      },
                      "& td:last-of-type": {
                        borderTopRightRadius: rowRounded ? "10px" : 0,

                        borderBottomRightRadius: rowRounded ? "10px" : 0,
                      },
                    }}
                  >
                    {Object.keys(th).map((key, colIndex) => (
                      <TableCell
                        key={colIndex}
                        sx={{
                          color: "#595959",
                          px: 2,
                          py: 2,
                          whiteSpace: "nowrap",
                          fontFamily: "Inter",
                          borderBottom: "1px solid #e3e3e3e3",
                          fontSize: "13px",
                          ...(cellStyles?.[key] || {}),
                        }}
                      >
                        {renderValue(row, key, rowIndex)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={Object.keys(th).length}
                    sx={{
                      textAlign: "center",
                      py: 4,
                      color: "#888",
                      fontStyle: "italic",
                      fontSize: "16px",
                    }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {loading && <Loader loading={loading} />}
    </>
  );
}
