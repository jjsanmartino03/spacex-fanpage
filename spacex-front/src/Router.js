import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./views/Navbar";

function AppRouter (props){
    return(
        <Router>
            <Route path="" component={Navbar}/>
        </Router>
    )
}
export default AppRouter;