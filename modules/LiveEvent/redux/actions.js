import * as actionTypes from "./constants";

export function startEvent(payload) {
  return {
    type: actionTypes.START_EVENT,
    payload,
  };
}

export function endEvent(payload) {
  return {
    type: actionTypes.END_EVENT,
    payload,
  };
}

export function abandonEvent(payload) {
  return {
    type: actionTypes.ABANDON_EVENT,
    payload,
  };
}

export function socketConnected(payload) {
  return {
    type: actionTypes.SOCKET_CONNECTED,
    payload,
  };
}

export function socketDisconnected(payload) {
  return {
    type: actionTypes.SOCKET_DISCONNECTED,
    payload,
  };
}

export function timerSync(payload) {
  return {
    type: actionTypes.TIMER_SYNC,
    payload,
  };
}

export function contentfulEventData(payload) {
  return {
    type: actionTypes.CONTENTFUL_EVENT_DATA,
    payload,
  };
}

export function eventDataSubmitSuccessful(payload) {
  return {
    type: actionTypes.EVENT_DATA_SUBMIT_SUCCESSFUL,
    payload,
  };
}

export function eventDataSubmitError(payload) {
  return {
    type: actionTypes.EVENT_DATA_SUBMIT_ERROR,
    payload,
  };
}
