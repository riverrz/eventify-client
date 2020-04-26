import { createSelector } from "reselect";
import { path } from "ramda";

const selectLiveEvent = (state) => state.liveEvent;

const selectAuth = (state) => state.auth;

export const makeSelectNamespace = () =>
  createSelector(selectAuth, path(["data", "user", "userId"]));

export const makeSelectDuration = () =>
  createSelector(selectLiveEvent, path(["data", "duration"]));

export const makeSelectDataBlob = () =>
  createSelector(selectLiveEvent, path(["data", "blob"]));
