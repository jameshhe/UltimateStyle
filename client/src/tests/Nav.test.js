import { render, screen } from "@testing-library/react";
import Navigation from "../components/navigation";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { SET_CURRENT_USER } from "../actions/types";

describe("Test navbar under multiple scenarios", () => {
  const initialState = { isAuthenticated: false, user: {}, loading: false };
  const mockStore = configureStore();
  let store, wrapper;

  store = mockStore(initialState);
  render(
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
  it("should only contain Services when user is not logged in", () => {
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.queryByText("My Profile")).toBeNull();
  });
});
