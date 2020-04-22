import * as actionTypes from "./constants";

export function liveEventStart(payload) {
  return {
    type: actionTypes.LIVE_EVENT_START,
    payload,
  };
}

export function liveEventEnd(payload) {
  return {
    type: actionTypes.LIVE_EVENT_END,
    payload,
  };
}
