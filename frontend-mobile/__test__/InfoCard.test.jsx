import { render } from "@testing-library/react-native";
import InfoCard from "../components/InfoCard";

test("Renderar ett kort och verifierar att titeln är korrekt", () => {
  const { getByText } = render(<InfoCard title="Växthus 1" />);
  const card = getByText("Växthus 1");
  expect(card).toBeTruthy();
});

test("Verifierar att ikonen renderas korrekt", () => {
  const imageSource = require("../assets/icon.png");
  const { getByRole } = render(
    <InfoCard
      title="Test"
      image={imageSource}
      accessibilityLabel="Ikon"
      accessibilityRole="image"
      accessible
    />
  );
  const image = getByRole("image");
  expect(image).toBeTruthy();
});
