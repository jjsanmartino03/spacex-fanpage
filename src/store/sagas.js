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
      return returnFunction({ ...commonOptions, hour: undefined, minute: undefined });
    case "month":
      return returnFunction({ ...commonOptions, hour: undefined, minute: undefined, day: undefined });
    case "year":
      return returnFunction({ year: "numeric" });
    case "quarter":
      let quarter = Math.floor((date.getMonth() + 1) / 3);
      let year = date.getFullYear();
      return `Quarter ${quarter} ${year}`;
    case "half":
      return ((date.getMonth() + 1) / 6 > 1 ? "1st Half " : "2nd Half ") + date.getFullYear;
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

  let launchObjects = response.map((value,) => {
    let launchDate = new Date(value.date_utc)
    return new Launch([
      value.name,
      value.details,
      value.id,
      launchDate,
      formatDateBasedOnPrecision(launchDate, value.date_precision)
    ])
  }
  );
  return launchObjects;
}

export default mainSaga;