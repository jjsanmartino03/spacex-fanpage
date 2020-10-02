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

  updateUpcomingLaunches = () => { // Track upcoming launches from api with saga
    this.props.dispatch(fetchUpcomingFromApi());
  }

  componentWillUnmount = () => {
    this.props.dispatch(deleteCollection()); // Just delete collection when users changes the page

    window.removeEventListener("scroll", this.handleScroll); // Remove the event listener used to move the header

    this.props.dispatch(changeActiveAnchor("/")); // Just remove the 
  }
  handleScroll = (event) => {
    let transformHeaderY = (window.scrollY / 2.2).toFixed(4);
    this.setState({ transformHeaderY }); // This is done so the render method is executed every time the user scrolls 
    // TODO see if it is fixeable
  }
  render = () => {
    const upcomingLaunches = this.props.upcomingLaunches;

    console.log("rendering"); // TODO: solve why Upcoming renders a lot of times (I think it's on the method handlescroll)
    console.log(upcomingLaunches[0])

    let paddingBottom =
      (
        upcomingLaunches.length > 1 // without this, if this is false, the following condition would throw an error
        &&
        upcomingLaunches[0].datePrecision === "hour"
      ) ? "pb-bigger": "pb-big"; // When the date precision is not hour, it looks better with less padding than when it has a data precision of hour
    paddingBottom = "pb-big"
    console.log(paddingBottom);
    const transformHeaderY = this.state.transformHeaderY;

    return (
      <div className="upcoming-view">
        <Container className={"upcoming-header " + paddingBottom}
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