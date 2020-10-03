import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";

import { changeActiveAnchor } from "../store/actions";

class HomeView extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(changeActiveAnchor("/"))
  }
  render = () => {
    return (
      <div className="home-view">
        <Container className="home-header pb-big"
          fluid>
          <h1 className="text-center">SpaceX Fanpage</h1>
          <h3 className="text-center pt-5 w-75">Do you like rockets? If so, you are in the right place! <span className="highlight">SpaceX Fanpage</span> is a personal project I made to show info about the company SpaceX. Until now it just displays the upcoming launches, and it gets the data from r-spacex/SpaceX-API, a public 'database' with live info of the company. Hope you like it!</h3>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ }) => ({

});

export default connect(mapStateToProps)(HomeView);