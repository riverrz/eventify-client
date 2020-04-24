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
