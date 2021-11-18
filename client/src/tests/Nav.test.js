import { render } from "@testing-library/react";
import Navigation from "../components/navigation";

test("Test Nav content", () => {
  render(<Navigation />);
  screen.debug();
});
