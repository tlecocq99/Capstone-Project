import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RandomFactionSlot from "../src/components/RandomFactionSlot";

describe("RandomFactionSlot", () => {
  it("renders dialog and factions", () => {
    const factions = [
      { id: "1", faction: "Empire", lord: "Karl Franz", slug: "empire" },
      { id: "2", faction: "Dwarfs", lord: "Thorgrim", slug: "dwarfs" },
    ];
    render(
      <RandomFactionSlot
        factions={factions}
        open={true}
        onClose={() => {}}
        onResult={() => {}}
        navigateToFaction={() => {}}
      />
    );
    expect(screen.getByText(/Which Faction Will You Get/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Empire/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dwarfs/i).length).toBeGreaterThan(0);
  });
});
