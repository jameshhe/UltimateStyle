import { render, screen } from "@testing-library/react";
import App from "../App";

test("Get Started button should be in the page", () => {
  render(<App />);
  expect(screen.getByText("Get Started")).toBeInTheDocument();
});
