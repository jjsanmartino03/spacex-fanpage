import React from "react";
import {connect} from "react-redux";

import {changeActiveAnchor} from "../store/actions";

class HomeView extends React.Component{
  componentDidMount = () =>{
    this.props.dispatch(changeActiveAnchor("/"))
  }
  render = () => {
    return (
      <h1>Hola mundo</h1>
    )
  }
}

const mapStateToProps = ({}) => ({
  
});

export default connect(mapStateToProps)(HomeView);