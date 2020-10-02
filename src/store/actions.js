export const actionNames = {
  addUpcomingLaunches: "ADD_UPCOMING_LAUNCHES",
  deleteCollection: "DELETE_COLLECTION",
  fetchUpcomingLaunches: "FETCH_UPCOMING_LAUNCHES",
  changeActiveAnchor: "CHANGE_ACTIVE_ANCHOR",
};

export const addUpcomingLaunches = (upcomingLaunches) => ({
  // Add fetched launches locally
  type: actionNames.addUpcomingLaunches,
  upcomingLaunches,
})

export const fetchUpcomingFromApi = () => ({
  // this action is taken by sagas
  type: actionNames.fetchUpcomingLaunches,
})

export const deleteCollection = () => ({
  // Delete the collection when needed
  type: actionNames.deleteCollection,
});

export const changeActiveAnchor = (newLocation) => ({
  // change the anchor that has to be styled as current
  type:actionNames.changeActiveAnchor,
  newLocation,
})