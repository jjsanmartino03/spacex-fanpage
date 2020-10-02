import React from "react";
import { Container, CardColumns, } from "react-bootstrap";
import { connect } from "react-redux";

import LaunchItem from "./components/LaunchItem";
import LaunchTimer from "./components/LaunchTimer";
import {
  fetchUpcomingFromApi,
  deleteCollection,
  changeActiveAnchor
} from "../store/actions";

class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transformHeaderY: 0, // This makes the header move along the scrolling
    }
  }
  componentDidMount = () => {
    this.props.dispatch(changeActiveAnchor("/upcoming")); // This is to style the current anchor
    this.updateUpcomingLaunches(); // Track upcoming launches from api
    window.addEventListener("scroll", this.handleScroll);  // Add a handler to the event scroll
  }
  updateUpcomingLaunches = () => { // Track upcoming launches from api
    this.props.dispatch(fetchUpcomingFromApi());
  }
  componentWillUnmount = () => {
    this.props.dispatch(deleteCollection());
    clearInterval(this.updateUpcomingInterval);
    window.removeEventListener("scroll", this.handleScroll);
    this.props.dispatch(changeActiveAnchor("/"));
  }
  handleScroll = (event) => {
    let transformHeaderY = (window.scrollY / 2.2).toFixed(4);
    this.setState({ transformHeaderY });
  }
  render = () => {
    const upcomingLaunches = this.props.upcomingLaunches;

    if (upcomingLaunches[0]) {
      console.log(setTimeout(()=> console.log("hols"), upcomingLaunches[0].date - new Date())); // This is done to update the countdown when it reaches 0
    }

    console.log("rendering");
    console.log(upcomingLaunches[0])
    const paddingBottom = (upcomingLaunches.length > 1 && upcomingLaunches[0].datePrecision === "hour") ? " pb-bigger" : " pb-big";
    const transformHeaderY = this.state.transformHeaderY;
    return (
      <div className="upcoming-view">
        <Container className={"upcoming-header" + paddingBottom}
          style={{
            transform: `translate3d(0px, ${transformHeaderY}px, 0px)`,
          }}
          fluid>
          <h1 className="text-center">Upcoming SpaceX Launches</h1>
          {upcomingLaunches.length > 0 ? <LaunchTimer /> : ""}
        </Container>
        <Container className=" my-4 upcoming-container" fluid="sm">

          <CardColumns>
            {upcomingLaunches.map((value, index) => {
              return <LaunchItem launch={value} index={index} key={value.id} />
            })}
          </CardColumns>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ upcomingView }) => {
  let { upcomingLaunches, headerPositionY } = upcomingView;
  return ({
    upcomingLaunches,
    headerPositionY,
  })
}

export default connect(mapStateToProps)(Upcoming);