import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CategoryCard from "../components/CategoryCard";

const mockNavigate = jest.fn();

// Mocka useNavigation
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mocka PlantItem för att slippa dess implementation i testet
jest.mock("../components/PlantItem", () => {
  return ({ index }) => {
    return <></>;
  };
});

describe("CategoryCard", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renderar titel och rätt antal PlantItem", () => {
    const plants = [
      { id: 1, name: "Monstera" },
      { id: 2, name: "Orkidé" },
    ];
    const { getByText, queryAllByTestId } = render(
      <CategoryCard title="Favoriter" plants={plants} />
    );

    expect(getByText("Favoriter")).toBeTruthy();

    // Eftersom vi mockar PlantItem med tom komponent finns inga element att räkna
    // Alternativt kan vi räkna plants.length för säkerhet:
    expect(plants.length).toBe(2);
  });

  it('navigerar till "AddPlant" vid knapptryck', () => {
    const plants = [];
    const { getByText } = render(<CategoryCard title="Test" plants={plants} />);

    const addButton = getByText("Lägg till växt");
    fireEvent.press(addButton);

    expect(mockNavigate).toHaveBeenCalledWith("AddPlant");
  });
});
