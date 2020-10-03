import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { changeActiveAnchor } from "../store/actions";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { transformHeaderY: 0 };
  }
  componentDidMount = () => {
    this.props.dispatch(changeActiveAnchor("/"));
    window.addEventListener("scroll", this.handleScroll);
  }
  handleScroll = (event) => {
    let transformHeaderY = (window.scrollY / 2.2);
    this.setState({ transformHeaderY }); // This is done so the render method is executed every time the user scrolls, and it doesn't affect the overall performance of the app
  }
  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll);
  }
  render = () => {
    let transformHeaderY = this.state.transformHeaderY;
    return (
      <div className="home-view bg-white">
        <Container className="home-header pb-big"
        style={{
          transform: `translate3d(0px, ${transformHeaderY}px, 0px)`,
        }}
          fluid>
          <h1 className="text-center w-100">SpaceX Fanpage</h1>
          <h4 className="text-center pt-5 w-75">Do you like rockets? If so, you are in the right place! <span className="highlight">SpaceX Fanpage</span> is an app that shows info about the company SpaceX. Feel free to check it out!</h4>
        </Container>
        <Container className="bg-white shadow-big rounded home-content py-4 mb-4 px-4 px-md-5 w-90-sm">
          <h2>The project</h2>
          <p>SpaceX Fanpage is a website that has some info about Space Exploration Technologies Inc (SpaceX), like upcoming launches. Up to now, October 2020, I've only made the Upcoming Launches page. The project itself has no backend, and it gets all the data from <a target="_blank" href="https://github.com/r-spacex/SpaceX-API">r-spacex/SpaceX-API</a>.</p>

          <p>This is a practice project where I put in practice React, React-Bootstrap, React-Redux, Redux-Saga, tools I recently learned to use.</p>

          <p>You can find the code of the project <a href="https://github.com/jjsanmartino03/spacex-fanpage" target="_blank">here in github</a>. If you find an error, or you want to made any correction or enhancement, you can open an issue or maybe open a pull request to the repository, I'd be happy to help!</p>
          <h2>Sections</h2>
          <div className="sections-item pt-3 d-flex flex-column align-items-center">
            <h3 className=""><Link to="upcoming" className="">Upcoming Launches</Link></h3>
            <p className="text-center">This page shows a list of the upcoming launches of SpaceX, with the details, date and name of each one. Some launches don't have the details section until days before the launch. Also, the date is displayed different based on the date precision of the liftoff.</p>
          </div>
        </Container >
      </div >
    )
  }
}

const mapStateToProps = ({ }) => ({

});

export default connect(mapStateToProps)(HomeView);