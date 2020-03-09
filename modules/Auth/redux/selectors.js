import { createSelector } from "reselect";
import { compose, prop, isEmpty, not } from "ramda";

const selectAuth = state => state.auth;

export const makeSelectLoggedIn = () =>
  createSelector(selectAuth, compose(not, isEmpty, prop("userData")));

export const makeSelectEvents = () =>
  createSelector(selectAuth, path(["userData", "events"]));
