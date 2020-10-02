import { combineReducers } from "redux";
import { actionNames } from "./actions";

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
    case actionNames.addUpcomingLaunches: // Add fetched launches to the store
      return {...state, 
        upcomingLaunches : [ ...action.upcomingLaunches
        ]
      };
    case actionNames.deleteCollection:
      return initialStore.upcomingView;
    default:
      return {...state};
  };
};

const navbarReducer = function (state=initialStore.navbarView, action) {
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