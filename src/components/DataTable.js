import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { sortCharacters } from "../utils/appUtils";

const DataTable = ({
  filteredCharacters,
  sortField,
  sortDirection,
  handleRowClick,
  totalPages,
  handleSort,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPage,
  page,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ th: { fontWeight: "bold" } }}>
              <TableCell>
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortDirection}
                  onClick={() => handleSort("name")}
                >
                  Character Name
                </TableSortLabel>
              </TableCell>
              <TableCell>TV Shows</TableCell>
              <TableCell>Video Games</TableCell>
              <TableCell>Allies</TableCell>
              <TableCell>Enemies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortCharacters(filteredCharacters, sortField, sortDirection).map(
              (character) => (
                <TableRow
                  hover
                  key={character._id}
                  onClick={() => handleRowClick(character)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{character.name ?? "-"}</TableCell>
                  <TableCell>{character.tvShows.length}</TableCell>
                  <TableCell>{character.videoGames.length}</TableCell>
                  <TableCell>
                    {character.allies.length
                      ? character.allies.join(", ")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {character.enemies.length
                      ? character.enemies.join(", ")
                      : "-"}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
        component="div"
        count={totalPages * rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
