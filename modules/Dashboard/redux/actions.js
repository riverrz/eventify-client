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

export function fetchAllEventsRequest(payload) {
  return {
    type: actionTypes.FETCH_ALL_EVENTS_REQUEST,
    payload
  };
}
export function fetchAllEventsSuccess(payload) {
  return {
    type: actionTypes.FETCH_ALL_EVENTS_SUCCESS,
    payload
  };
}
export function fetchAllEventsError(payload) {
  return {
    type: actionTypes.FETCH_ALL_EVENTS_ERROR,
    payload
  };
}
