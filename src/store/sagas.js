import axios from "axios";
import { takeEvery, call, put } from "redux-saga/effects";
import Launch from "../entities/Launch";
import { actionNames, addUpcomingLaunches } from "./actions";


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

  let launchObjects = response.map((value,) =>{
    return new Launch([value.name, value.details, value.id, value.date_utc, value.date_precision])
  }
  );
  return launchObjects;
}

export default mainSaga;