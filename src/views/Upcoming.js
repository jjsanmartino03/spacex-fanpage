import React from "react";
import { Container,  CardColumns, } from "react-bootstrap";
import { connect } from "react-redux";

import LaunchItem from "./components/LaunchItem";
import LaunchTimer from "./components/LaunchTimer";
import { fetchUpcomingFromApi, deleteCollection, changeActiveAnchor } from "../store/actions";



class Upcoming extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      transformY : 0,
    }
  }
  componentDidMount = () => {
    this.props.dispatch(changeActiveAnchor("/upcoming"));
    this.updateLaunches();
    window.addEventListener("scroll", this.handleScroll);
    
    this.updateUpcomingInterval = setInterval(this.updateLaunches, 60000);
  }
  updateLaunches = () => {
    this.props.dispatch(fetchUpcomingFromApi());
  }
  componentWillUnmount = () => {
    this.props.dispatch(deleteCollection());
    clearInterval(this.updateUpcomingInterval);
    window.removeEventListener("scroll", this.handleScroll);
    this.props.dispatch(changeActiveAnchor("/"));
  }
  handleScroll = (event) => {
    let transformY = (window.scrollY/2.2).toFixed(4);
    this.setState({transformY});
  }
  render = () => {
    const upcomingLaunches = this.props.upcomingLaunches;
    const transformY = this.state.transformY;
    return (
      <div className="upcoming-view">
        <Container className="upcoming-header"
          style={{
            transform : `translate3d(0px, ${transformY}px, 0px)`,
          }}
        fluid>
          <h1 className="text-center">Upcoming SpaceX Launches</h1>
          {upcomingLaunches.length > 0 ? <LaunchTimer/> : ""}
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