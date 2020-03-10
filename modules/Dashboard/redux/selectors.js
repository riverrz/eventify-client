import { createSelector } from "reselect";
import { path } from "ramda";

const selectDashboard = state.dashboard;

export const makeSelectEvents = () =>
  createSelector(selectDashboard, path(["allEvents", "data"]));
