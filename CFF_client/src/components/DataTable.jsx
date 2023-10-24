import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const DataTable = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <TableContainer sx={{ boxShadow: 3 }}>
      <Table>
        <TableHead style={{ backgroundColor: "#263238" }}>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={{ color: "#FFFFFF" }} key={column}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rows, rowIndex) => (
            <TableRow key={rowIndex}>
              {rows.map((row, index) => (
                <TableCell
                  sx={{
                    backgroundColor:
                      row == "Fraud Transaction!"
                        ? "#e91e63"
                        : row == "Not Fraud Transaction"
                        ? "#009688"
                        : "inherit",
                  }}
                  key={index}
                >
                  {row}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
