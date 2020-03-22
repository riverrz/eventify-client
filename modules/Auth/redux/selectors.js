import { createSelector } from "reselect";
import { compose, path, isEmpty, not } from "ramda";

const selectAuth = state => state.auth;

export const makeSelectLoggedIn = () =>
  createSelector(selectAuth, compose(not, isEmpty, path(["data", "user"])));

export const makeSelectAuthToken = () =>
  createSelector(selectAuth, path(["data", "token"]));

export const makeSelectUser = () =>
  createSelector(selectAuth, path(["data", "user"]));

export const makeSelectParticipationTokens = () =>
  createSelector(selectAuth, path(["data", "participationTokens"]));
