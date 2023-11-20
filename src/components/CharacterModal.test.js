import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterModal from "./CharacterModal";

test("Opens and displays character details modal", () => {
  const character = {
    name: "Mickey Mouse",
    image: "mickey.jpg",
    tvShows: ["The Mickey Mouse Club"],
    videoGames: ["Kingdom Hearts"],
  };

  render(
    <CharacterModal open={true} onClose={() => {}} character={character} />
  );

  expect(screen.getByText("Mickey Mouse")).toBeInTheDocument();
  expect(screen.getByText("The Mickey Mouse Club")).toBeInTheDocument();
  expect(screen.getByText("Kingdom Hearts")).toBeInTheDocument();
});
