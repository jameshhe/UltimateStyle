import { render } from "@testing-library/react";
import Navigation from "../components/navigation";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("Test Navbar with mock store", () => {
  const initialState = { isAuthenticated: false, user: {}, loading: false };
  const mockStore = configureStore();
  let store, wrapper;

  it("Contains Services", () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <Navigation />
      </Provider>
    );

    expect(getByText("Services")).toBeInTheDocument();
  });
});
