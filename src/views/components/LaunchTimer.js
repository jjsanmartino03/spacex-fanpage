import { connect } from "react-redux";
import { fetchUpcomingFromApi } from "../../store/actions";
import React from "react";

class LaunchTimer extends React.Component {
  constructor(props) {
    super(props);
    let distanceInSeconds = Math.floor((this.props.nextLaunch.date - new Date()) / 1000); // Calculate how many seconds before next launch
    this.state = {
      distance: distanceInSeconds, // Save the seconds
    };
  }

  componentDidMount = () => {
    this.timeInterval = setInterval(
      this.substractASecond, 1000 // Update the timer every second
    );
    this.updateTimeInterval = setInterval(
      this.updateTimeInterval, 60000 // Every minute update the timer, in case the user wasn't using the app for some time
    );
    this.updateUpcomingTimeout = setTimeout(
      this.props.dispatch(fetchUpcomingFromApi()),
      this.state.distance * 1000,
    )
  }

  updateTimeInterval = () => {// update the timer, in case the user wasn't using the app for some time
    let distance = Math.floor((this.props.nextLaunch.date - new Date()) / 1000);
    this.setState({ distance });
  }

  substractASecond = () => {// Update every second
    this.setState(({ distance }) => {
      return { distance: distance - 1 }
    })
  }

  componentWillUnmount = () => {// clear all intervals and timeouts
    clearInterval(this.timeInterval);
    clearInterval(this.updateTimeInterval);
    clearTimeout(this.updateUpcomingTimeout);
  }

  render() {
    // Doing time calculations
    const second = 1, minute = second * 60, hour = minute * 60, day = hour * 24;

    let distance = this.state.distance;
    let launchName = this.props.nextLaunch.name;
    let { stringDate, datePrecision } = this.props.nextLaunch;

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
                  <div >
                    <span className="timer-number">
                      {days}
                    </span>{"Day" + (days !== 1 ? "s" : "")}
                  </div>
                  <div >
                    <span className="timer-number">
                      {hours}
                    </span>{"Hour" + (hours !== 1 ? "s" : "")}
                  </div>
                  <div >
                    <span className="timer-number">
                      {minutes}
                    </span>{"Minute" + (minutes !== 1 ? "s" : "")}
                  </div>
                  <div >
                    <span className="timer-number">
                      {seconds}
                    </span>{"Second" + (seconds !== 1 ? "s" : "")}
                  </div>
                </div>
              )
              :
              ( // show just the stringDate if datePrecision is not of hour
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

const mapStateToProps = ({ upcomingView }) => {
  let nextLaunch = upcomingView.upcomingLaunches[0];

  // The following isn't needed because that verification is already made in sagas
  /*for (let launch of upcomingLaunches) {
    if (launch.date > new Date() || launch.datePrecision !== "hour") {
      // For instance, if a launch has date_precision = "month" and the date is October 1st 00:00, it will not be deleted on October 4th
      console.log(launch);
      nextLaunch = launch;
      break;
    }
  }*/
  return ({
    nextLaunch,
  })
}

export default connect(mapStateToProps)(LaunchTimer);