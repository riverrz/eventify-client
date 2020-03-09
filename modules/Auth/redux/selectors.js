import { createSelector } from "reselect";
import { compose, path, isEmpty, not } from "ramda";

const selectAuth = state => state.auth;

export const makeSelectLoggedIn = () =>
  createSelector(selectAuth, compose(not, isEmpty, path("data", "user")));

export const makeSelectEvents = () =>
  createSelector(selectAuth, path(["data", "user", "events"]));
