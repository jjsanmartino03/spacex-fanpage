import { combineReducers } from "redux";
import { actionNames } from "./actions";
import Launch from "../entities/Launch";
const initialStore = {
  upcomingView: {
    upcomingLaunches: [],
  },
  navbarView : {
    currentLocation : "", // Done to highlight current location in navbar
  }
};

const upcomingReducer = function (state = initialStore.upcomingView, action) {
  switch (action.type) {
    case actionNames.addUpcomingLaunches:
      const testLaunch = new Launch({ // Test case for development
          name: "Test Launch III",
          details: null,
          id : "ee4fdc88y2c",
          launchDate: new Date("Fri Oct 02 2020 20:00:59 GMT-0300 (Argentina Standard Time)"),
          stringDate: "Aug 2020",
          date_precision: "hour",
      })
      return {...state, 
        upcomingLaunches : [ testLaunch,...action.upcomingLaunches
        ]
      };
    case actionNames.deleteCollection:
      return initialStore.upcomingView;
    default:
      return {...state};
  };
};

const navbarReducer = function (state= initialStore.navbarView, action) {
  switch (action.type){
    case actionNames.changeActiveAnchor:
      return {...state, currentLocation: action.newLocation};
    default:
      return {...state};
      
  };
};

const mainReducer = combineReducers({
  upcomingView: upcomingReducer,
  navbarView: navbarReducer,
});

export default mainReducer;