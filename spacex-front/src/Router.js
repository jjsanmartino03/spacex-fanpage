import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./views/Navbar";
import Upcoming from "./views/Upcoming";

function AppRouter (props){
    return(
        <Router>
            <Route path="" component={Navbar}/>
            <Route path="/upcoming" exact component={Upcoming}/>
        </Router>
    )
}
export default AppRouter;