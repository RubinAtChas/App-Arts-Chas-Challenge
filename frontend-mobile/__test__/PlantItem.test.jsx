import { render, fireEvent } from "@testing-library/react-native";
import PlantItem from "../components/PlantItem";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("PlantItem", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  const mockProps = {
    id: 1,
    name: "Tomat 1",
    status: "good",
    type: "tomato",
    lastWatered: "2025-06-10",
    moisture: 50,
    light: 90,
    temp: 22,
    nitrogen: 10,
    phosphor: 5,
    potassium: 7,
  };

  it("Verifierar att man kommer till PlantDetails", () => {
    const { getByText } = render(<PlantItem {...mockProps} />);
    const touchable = getByText("Tomat 1").parent;
    fireEvent.press(touchable);
    expect(mockNavigate).toHaveBeenCalledWith("Details", {
      otherParams: expect.objectContaining({ id: 1, name: "Tomat 1" }),
    });
  });
});
