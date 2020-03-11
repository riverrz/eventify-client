import { createSelector } from "reselect";
import { path } from "ramda";

const selectDashboard = state => state.dashboard;

export const makeSelectAllEvents = () =>
  createSelector(selectDashboard, path(["events", "data"]));

export const makeSelectInvitedEvents = () =>
  createSelector(selectDashboard, path(["events", "data", "invitedEvents"]));

export const makeSelectCreatedEvents = () =>
  createSelector(selectDashboard, path(["events", "data", "createdEvents"]));
