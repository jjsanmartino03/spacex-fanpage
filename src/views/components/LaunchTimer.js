import {connect} from "react-redux"
import React from "react";

class LaunchTimer extends React.Component {
  constructor (props){
    super(props);
    let distanceInSeconds = Math.floor((this.props.nextDate - new Date()) / 1000);
    this.state = {
      distance : distanceInSeconds,
    };
  }
  componentDidMount = () => {
    this.timeInterval = setInterval(
      this.updateTimer, 1000
    );
  }
  updateTimer = () => {
    this.setState(({distance}) => {
      return {distance: distance -1 }
    })
  }
  componentWillUnmount = () =>{
    clearInterval(this.timeInterval);
  }
  render() {
    const second = 1, minute = second*60, hour=minute*60, day = hour*24;

    let distance = this.state.distance;
    let launchName = this.props.nextLaunchName;

    let days = Math.floor(distance/day);
    let hours = Math.floor((distance%day)/hour);
    let minutes = Math.floor((distance%hour)/minute);
    let seconds = Math.floor((distance%minute)/second);
    
    
    return (
      <div className="text-center timer-container">
        <h3 className="text-center launch-timer-title mt-4">The next launch, "<span className="highlight">{launchName}</span>" starts in:</h3>
        <div className="timers">
          <div ><span className="timer-number">{days}</span>{"Day" + (days !== 1 ? "s":"")}</div>
          <div ><span className="timer-number">{hours}</span>{"Hour" + (hours !== 1 ? "s":"")}</div>
          <div ><span className="timer-number">{minutes}</span>{"Minute" + (minutes !== 1 ? "s":"")}</div>
          <div ><span className="timer-number">{seconds}</span>{"Second" + (seconds !== 1 ? "s":"")}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({upcomingView}) => {
  let nextLaunch = upcomingView.upcomingLaunches[0];
  return ({
  nextDate : nextLaunch.dateUtc,
  nextLaunchName : nextLaunch.name,
})}

export default connect(mapStateToProps)(LaunchTimer);