import * as actionTypes from "./constants";

export function pariticipateRequest(payload) {
  return {
    type: actionTypes.PARTICIPATE_REQUEST,
    payload
  };
}
