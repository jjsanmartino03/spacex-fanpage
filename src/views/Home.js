import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { changeActiveAnchor } from "../store/actions";

class HomeView extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(changeActiveAnchor("/"))
  }
  render = () => {
    return (
      <div className="home-view bg-white">
        <Container className="home-header pb-big"
          fluid>
          <h1 className="text-center">SpaceX Fanpage</h1>
          <h4 className="text-center pt-5 w-75">Do you like rockets? If so, you are in the right place! <span className="highlight">SpaceX Fanpage</span> is a personal project I made to show info about the company SpaceX. Until now it just displays the upcoming launches, and it gets the data from <a target="_blank" href="https://github.com/r-spacex/SpaceX-API">r-spacex/SpaceX-API</a>, a public 'database' with live info of the company. Hope you like it!</h4>
        </Container>
        <Container className="bg-white shadow rounded home-content py-4 mb-4 px-5 w-90-sm">
          <h2>The project</h2>
          <p>SpaceX Fanpage is a website that has some info about Space Exploration Technologies Inc (SpaceX), like upcoming launches. Up to now, October 2020, I've only made the Upcoming Launches page. The project itself has no backend, and it gets all the data from <a target="_blank" href="https://github.com/r-spacex/SpaceX-API">r-spacex/SpaceX-API</a>.</p>

          <p>This is a practice project where I put in practice React, React-Bootstrap, React-Redux, Redux-Saga, tools I recently learned to use.</p>

          <p>You can find</p>
        </Container >
      </div >
    )
  }
}

const mapStateToProps = ({ }) => ({

});

export default connect(mapStateToProps)(HomeView);