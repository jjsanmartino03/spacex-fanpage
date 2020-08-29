import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./views/Navbar";
import Upcoming from "./views/Upcoming";
import { Provider } from "react-redux";
import Footer from "./views/Footer";

import store from "./store/index";

function AppRouter(props) {
  return (
    <Provider store={store}>
      <Router>
        <Route path="" component={Navbar} />
        <Route path="/upcoming" exact component={Upcoming} />
        <Route path="" component={Footer} />
      </Router>
    </Provider>
  )
}
export default AppRouter;