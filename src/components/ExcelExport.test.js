import React from "react";
import { render, screen } from "@testing-library/react";
import ExcelExport from "./ExcelExport";

describe("ExcelExport", () => {
  const testData = [
    { Name: "Mickey Mouse", Films: "Film1, Film2" },
    { Name: "Donald Duck", Films: "Film3, Film4" },
  ];

  const defaultProps = {
    data: testData,
    filename: "test-export",
  };

  it("renders the ExcelExport component", () => {
    render(<ExcelExport {...defaultProps} />);
    expect(
      screen.getByText("Export PieChart data to Excel")
    ).toBeInTheDocument();
  });
});
