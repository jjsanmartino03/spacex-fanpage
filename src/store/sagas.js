import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import Launch from "../entities/Launch";
import { actionNames, addUpcomingLaunches } from "./actions";

const formatDateBasedOnPrecision = (date, precision) => {
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
      options);
  }
  switch (precision) {
    case "hour":
      return returnFunction({ ...commonOptions, weekday: "short" });
    case "day":
      return returnFunction({ ...commonOptions, hour: undefined, minute: undefined, timeZone: "UTC" });
    case "month":
      return returnFunction({ ...commonOptions, hour: undefined, minute: undefined, day: undefined, timeZone: "UTC",  }).replace(", UTC", "");
    case "year":
      return returnFunction({ year: "numeric", timeZone: "UTC", });
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
  yield takeEvery(actionNames.fetchUpcomingLaunches, fetchUpcomingSaga);
};

function* fetchUpcomingSaga(action) {
  try {
    const upcomingLaunches = yield call(fetchUpcomingLaunches);

    yield put(addUpcomingLaunches(upcomingLaunches));

  } catch (error) {
    console.error("Error", error)
  }
}

async function fetchUpcomingLaunches() {
  let response = (await axios.get("https://api.spacexdata.com/v4/launches/upcoming")).data;

  response = response.filter(value => {
    if (new Date(value.date_utc) < new Date() && value.date_precision === "hour") return false;
    else return true;
  })

  let launchObjects = response.map((value,) => {
    let launchDate = new Date(value.date_utc)
    return new Launch([
      value.name,
      value.details,
      value.id,
      launchDate,
      formatDateBasedOnPrecision(launchDate, value.date_precision),
      value.date_precision,
    ])
  }
  );
  return launchObjects;
}

export default mainSaga;