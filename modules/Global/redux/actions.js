import * as actionTypes from "./constants";

export const initAppState = (payload) => {
  return {
    type: actionTypes.INIT_APP_STATE,
    payload,
  };
};

export const openModal = (payload) => {
  return {
    type: actionTypes.OPEN_MODAL,
    payload,
  };
};

export const openModal = (payload) => {
  return {
    type: actionTypes.CLOSE_MODAL,
    payload,
  };
};
