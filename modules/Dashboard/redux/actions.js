import * as actionTypes from "./constants";

export function createEventRequest(payload) {
  return {
    type: actionTypes.CREATE_EVENT_REQUEST,
    payload
  };
}

export function createEventSuccess(payload) {
  return {
    type: actionTypes.CREATE_EVENT_SUCCESS,
    payload
  };
}

export function createEventError(payload) {
  return {
    type: actionTypes.CREATE_EVENT_ERROR,
    payload
  };
}
