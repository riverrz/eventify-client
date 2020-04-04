import { createSelector } from "reselect";
import { path } from "ramda";

const selectGlobal = (state) => state.global;

export const makeSelectModals = createSelector(selectGlobal, path(["modals"]));
