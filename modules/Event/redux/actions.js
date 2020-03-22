import * as actionTypes from "./constants";

export function pariticipateRequest(payload) {
  return {
    type: actionTypes.PARTICIPATE_REQUEST,
    payload
  };
}

export function pariticipateSuccess(payload) {
  return {
    type: actionTypes.PARTICIPATE_SUCCESS,
    payload
  };
}

export function pariticipateError(payload) {
  return {
    type: actionTypes.PARTICIPATE_ERROR,
    payload
  };
}