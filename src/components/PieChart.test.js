import { render, screen } from "@testing-library/react";
import PieChart from "./PieChart";

describe("PieChart Component", () => {
  it("renders the PieChart with correct title", () => {
    const filteredCharacters = [
      { name: "Character1", films: ["Film1", "Film2"] },
      { name: "Character2", films: ["Film3"] },
    ];

    render(<PieChart filteredCharacters={filteredCharacters} />);

    const titleElement = screen.getByText("Films Participation");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the PieChart with correct data", () => {
    const filteredCharacters = [
      { name: "Character1", films: ["Film1", "Film2"] },
      { name: "Character2", films: ["Film3"] },
    ];

    render(<PieChart filteredCharacters={filteredCharacters} />);

    const tooltipElement = screen.getByText("Character1");
    expect(tooltipElement).toBeInTheDocument();
  });
});
