import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";

import Launch from "../entities/Launch";
import { actionNames, addUpcomingLaunches } from "./actions";
import { formatDateBasedOnPrecision } from "./formatDate";

function* mainSaga() {
  yield takeEvery(actionNames.fetchUpcomingLaunches, fetchUpcomingSaga); // catch the action "fetchUpcomingFromApi"
}

function* fetchUpcomingSaga(action) {
  try {
    const upcomingLaunches = yield call(fetchUpcomingLaunches); // call the function that actually calls the api

    yield put(addUpcomingLaunches(upcomingLaunches)); // Call the action that puts the launches array to the store
  } catch (error) {
    console.error("Error", error);
  }
}

async function fetchUpcomingLaunches() {
  let response = (
    await axios.get("https://api.spacexdata.com/v4/launches/upcoming")
  ).data;
  
  //This serves to test the system
  /* 
  let first_launch = {
    date_utc: "2020-10-22T16:48:30.000Z",
    name: "Test",
    details:
      "This mission will launch the fourteenth batch of operational Starlink satellites, which are expected to be version 1.0, from SLC-40, Kennedy Space Center. It is the fifteenth Starlink launch overall. The satellites will be delivered to low Earth orbit and will spend a few weeks maneuvering to their operational altitude of 550 km. The booster for this mission is expected to land on JRTI.",
    id: "5ef6a2e70059c33ceholae4a8293",
    date_precision: "hour",
  };
  response.unshift(first_launch);
  */
  response = response.filter(
    // Filter those launches already launched
    (value) => {
      console.log(new Date(value.date_utc) < new Date() &&
      value.date_precision === "hour")
      if (
        new Date(value.date_utc) < new Date() &&
        value.date_precision === "hour" // For instance, if a launch has date_precision = "month" and the date is October 1st 00:00, it will not be deleted on October 4th
      )
        return false;
      else return true;
    }
  );
  console.log(response)

  let launchObjects = response.map(
    // build an array of Launch objects
    (value) => {
      let launchDate = new Date(value.date_utc);
      let { name, details, id, date_precision } = value;
      return new Launch({
        name,
        details, // This can be either a string or null
        id,
        launchDate,
        stringDate: formatDateBasedOnPrecision(
          launchDate,
          value.date_precision
        ), // Style the date string based on the precision of the date
        date_precision,
      });
    }
  );
  return launchObjects; // Return an array of Launch objects
}

export default mainSaga;
