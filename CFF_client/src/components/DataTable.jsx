import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const DataTable = ({ data, columns }) => {
  console.log(data, columns);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rows, rowIndex) => (
            <TableRow key={rowIndex}>
              {rows.map((row, index) => (
                <TableCell key={index}>{row}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DataTable;
