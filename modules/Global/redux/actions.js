import * as actionTypes from "./constants";

export const initAppState = payload => {
  return {
    type: actionTypes.INIT_APP_STATE,
    payload
  };
};
