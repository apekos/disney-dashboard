import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DataTable from "./DataTable";

// mock data for testing
const characters = [
  {
    _id: "1",
    name: "Batman",
    tvShows: ["TV1"],
    videoGames: ["VG1"],
    allies: ["Robin"],
    enemies: ["Joker"],
  },
  {
    _id: "2",
    name: "Spider Man",
    tvShows: ["TV2"],
    videoGames: ["VG2"],
    allies: ["Iron Man"],
    enemies: ["Green Goblin"],
  },
];

// mock functions for testing
const handleRowClick = jest.fn();
const handleSort = jest.fn();
const handleChangePage = jest.fn();
const handleChangeRowsPerPage = jest.fn();

// render the component with mock data and functions
const renderComponent = () => {
  render(
    <DataTable
      filteredCharacters={characters}
      sortField="name"
      sortDirection="asc"
      handleRowClick={handleRowClick}
      totalPages={1}
      handleSort={handleSort}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPage={10}
      page={0}
    />
  );
};

describe("DataTable component", () => {
  // test if the component renders correctly
  test("should render the component with mock data", () => {
    renderComponent();
    // check if the table headers are rendered
    expect(screen.getByText("Character Name")).toBeInTheDocument();
    expect(screen.getByText("TV Shows")).toBeInTheDocument();
    expect(screen.getByText("Video Games")).toBeInTheDocument();
    expect(screen.getByText("Allies")).toBeInTheDocument();
    expect(screen.getByText("Enemies")).toBeInTheDocument();
    // check if the table rows are rendered
    expect(screen.getByText("Batman")).toBeInTheDocument();
    expect(screen.getByText("Spider Man")).toBeInTheDocument();
    // check if the table pagination is rendered
    expect(screen.getByText("Rows per page:")).toBeInTheDocument();
    expect(screen.getByText("1–10 of 10")).toBeInTheDocument();
  });

  // test if the component handles row click event
  test("should call handleRowClick function when a row is clicked", () => {
    renderComponent();
    // click on the first row
    fireEvent.click(screen.getByText("Batman"));
    // check if the handleRowClick function is called with the correct character
    expect(handleRowClick).toHaveBeenCalledTimes(1);
    expect(handleRowClick).toHaveBeenCalledWith(characters[0]);
  });

  // test if the component handles sort click event
  test("should call handleSort function when a sort label is clicked", () => {
    renderComponent();
    // click on the character name sort label
    fireEvent.click(screen.getByText("Character Name"));
    // check if the handleSort function is called with the correct field
    expect(handleSort).toHaveBeenCalledTimes(1);
    expect(handleSort).toHaveBeenCalledWith("name");
  });
});
