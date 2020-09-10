import { connect } from "react-redux"
import React from "react";

class LaunchTimer extends React.Component {
  constructor(props) {
    super(props);
    let distanceInSeconds = Math.floor((this.props.nextDate - new Date()) / 1000);
    this.state = {
      distance: distanceInSeconds,
    };
  }
  componentDidMount = () => {
    this.timeInterval = setInterval(
      this.substractASecond, 1000
    );
    this.updateTimeInterval = setInterval(
      this.updateTimeInterval, 60000
    );
  }
  updateTimeInterval = () => {
    let distance = Math.floor((this.props.nextDate - new Date()) / 1000);
    this.setState({ distance });
  }
  substractASecond = () => {
    this.setState(({ distance }) => {
      return { distance: distance - 1 }
    })
  }
  componentWillUnmount = () => {
    clearInterval(this.timeInterval);
    clearInterval(this.updateTimeInterval);
  }
  render() {
    const second = 1, minute = second * 60, hour = minute * 60, day = hour * 24;

    let distance = this.state.distance;
    let launchName = this.props.nextLaunchName;
    let {stringDate, datePrecision} = this.props.nextLaunch;

    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);
    return (
      <div className="text-center pt-4 timer-container">
        <h3 className="text-center launch-timer-title mt-4">The next launch, "<span className="highlight">{launchName}</span>" takes off in:</h3>
        <div className="timers">
          {
            datePrecision === "hour" ?
            (
                  <div className="d-flex justify-content-around mt-2 mb-0 w-75">
                  <div ><span className="timer-number">{days}</span>{"Day" + (days !== 1 ? "s" : "")}</div>
                  <div ><span className="timer-number">{hours}</span>{"Hour" + (hours !== 1 ? "s" : "")}</div>
                  <div ><span className="timer-number">{minutes}</span>{"Minute" + (minutes !== 1 ? "s" : "")}</div>
                  <div ><span className="timer-number">{seconds}</span>{"Second" + (seconds !== 1 ? "s" : "")}</div>
                  </div>
                )
                :
                (
                <div className="string-date-container my-0 py-0 pt-5">
                  <h2 className="py-0 my-0 highlight">{stringDate}</h2>
                </div>
                )
  }

        </div>
        </div>
    )
  }
}

const mapStateToProps = ({upcomingView}) => {
  let nextLaunch = upcomingView.upcomingLaunches[0];
  return ({
          nextDate : nextLaunch.date,
  nextLaunchName : nextLaunch.name,
  nextLaunch,
})}

export default connect(mapStateToProps)(LaunchTimer);