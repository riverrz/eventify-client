import { createSelector } from "reselect";
import { path } from "ramda";

const selectLiveEvent = (state) => state.liveEvent;

const selectAuth = (state) => state.auth;

export const makeSelectNamespace = () =>
createSelector(selectAuth, path(["data", "user", "userId"]));
