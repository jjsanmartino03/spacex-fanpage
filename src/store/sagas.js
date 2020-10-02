import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import Launch from "../entities/Launch";
import { actionNames, addUpcomingLaunches } from "./actions";


const formatDateBasedOnPrecision = (date, precision) => {
  // This method modifies the visible data based on the date precision of the launch
  let commonOptions = {
    year: "numeric",
    hour12: false,
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  const returnFunction = (options) => {
    return date.toLocaleString(
      "default",
      options
    );
  }

  switch (precision) {
    case "hour":
      return returnFunction({
        ...commonOptions,
        weekday: "short"
      });

    case "day":
      return returnFunction({
        ...commonOptions,
        hour: undefined,
        minute: undefined,
        timeZone: "UTC"
      });

    case "month":
      return returnFunction({
        ...commonOptions,
        hour: undefined,
        minute: undefined,
        day: undefined,
        timeZone: "UTC",
      }).replace(", UTC", "");

    case "year":
      return returnFunction({
        year: "numeric",
        timeZone: "UTC",
      });

    case "quarter":
      let quarter = Math.floor((date.getUTCMonth() + 1) / 3);
      let year = date.getUTCFullYear();
      return `Quarter ${quarter} ${year}`;

    case "half":
      return ((date.getUTCMonth() + 1) / 6 > 1 ? "1st Half " : "2nd Half ") + date.getUTCFullYear();

    default:
      return date.toString();
  }
}

function* mainSaga() {
  yield takeEvery(actionNames.fetchUpcomingLaunches, fetchUpcomingSaga); // catch the action "fetchUpcomingFromApi"
};

function* fetchUpcomingSaga(action) {
  try {
    const upcomingLaunches = yield call(fetchUpcomingLaunches); // call the function that actually calls the api

    yield put(addUpcomingLaunches(upcomingLaunches)); // Call the action that puts the launches array to the store

  } catch (error) {
    console.error("Error", error)
  }
}

async function fetchUpcomingLaunches() {
  let response = (await axios.get("https://api.spacexdata.com/v4/launches/upcoming")).data;

  response = response.filter( // Filter those launches already launched
    value => {
      if (new Date(value.date_utc)
        <
        new Date()
        &&
        value.date_precision === "hour" // For instance, if a launch has date_precision = "month" and the date is October 1st 00:00, it will not be deleted on October 4th
      ) return false;
      else return true;
    }
  )

  let launchObjects = response.map( // build an array of Launch objects
    value => {
      let launchDate = new Date(value.date_utc)
      let { name, details, id, date_precision } = value;

      return new Launch({
        name,
        details, // This can be either a string or null
        id,
        launchDate,
        stringDate: formatDateBasedOnPrecision(launchDate, value.date_precision), // Style the date string based on the precision of the date
        date_precision, // TODO: see if this is necessary here
      })
    }
  );
  return launchObjects; // Return an array of Launch objects
}

export default mainSaga;