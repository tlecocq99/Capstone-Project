import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FactionCard from "../src/components/FactionCard";

describe("FactionCard", () => {
  it("renders faction name and lord", () => {
    const faction = {
      faction: "Empire",
      lord: "Karl Franz",
      race: "Human",
      summary: "The Empire is a human nation.",
      dlc_required: "None",
      icon_url: "",
    };
    render(<FactionCard faction={faction} />);
    expect(screen.getAllByText(/Empire/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Karl Franz/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Human/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/The Empire is a human nation./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/DLC: None/i)).toBeInTheDocument();
  });
});
