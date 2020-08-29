export const actionNames = {
  addUpcomingLaunches: "ADD_UPCOMING_LAUNCHES",
  deleteCollection: "DELETE_COLLECTION",
  fetchUpcomingLaunches: "FETCH_UPCOMING_LAUNCHES",
  changeActiveAnchor: "CHANGE_ACTIVE_ANCHOR",
};

export const addUpcomingLaunches = (upcomingLaunches) => ({
  type: actionNames.addUpcomingLaunches,
  upcomingLaunches,
})

export const fetchUpcomingFromApi = () => ({
  type: actionNames.fetchUpcomingLaunches,
})

export const deleteCollection = () => ({
  type: actionNames.deleteCollection,
});

export const changeActiveAnchor = (newLocation) => ({
  type:actionNames.changeActiveAnchor,
  newLocation,
})