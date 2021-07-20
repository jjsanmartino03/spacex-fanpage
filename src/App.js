import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./views/Navbar";
import Upcoming from "./views/Upcoming";
import Footer from "./views/Footer";
import Home from "./views/Home";
import store from "./store/index";

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Route path="">
          <Navbar />
        </Route>
        <Switch>
          <Route path="/" exact>
            <Home />
            <Footer />
          </Route>
          <Route path="/upcoming" exact>
            <Upcoming />
            <Footer />
          </Route>
          <Route path="/">
            <Redirect to="/upcoming" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
export default App;
