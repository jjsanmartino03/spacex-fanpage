import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./views/Navbar";
import Upcoming from "./views/Upcoming";
import Footer from "./views/Footer";
import store from "./store/index";

function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <Route path="">
          <Navbar />
        </Route>
        <Route path="/upcoming" exact>
          <Upcoming />
        </Route>
        <Route path="">
          <Footer />
        </Route>
      </Router>
    </Provider>
  );
};
export default App;