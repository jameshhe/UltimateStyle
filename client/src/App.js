import dotenv from "dotenv";
import jwt_decode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logoutUser, setCurrentUser } from "./actions/authActions";

import Navigation from "./components/navigation";
import PrivateRoute from "./components/PrivateRoute";

import { PRIVATE_ROUTES } from "./private-routes";
import { ROUTES } from "./routes";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

dotenv.config();

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navigation />
          <Switch>
            {ROUTES.map((route, i) => (
              <Route exact key={i} {...route} />
            ))}
          </Switch>
          <Switch>
            {PRIVATE_ROUTES.map((route, i) => (
              <PrivateRoute exact key={i} {...route} />
            ))}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
