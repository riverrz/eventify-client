import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  userData: {},
  error: false
};

export default function(state = initialState, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case actionTypes.SIGNUP_REQUEST: {
        draft.loading = true;
        draft.error = false;
        draft.userData = {};
        break;
      }
      case actionTypes.SIGNUP_SUCCESS: {
        draft.loading = false;
        draft.error = false;
        draft.userData = payload;
        break;
      }
      case actionTypes.SIGNUP_ERROR: {
        draft.loading = false;
        draft.error = true;
        draft.userData = {};
        break;
      }
    }
  });
}
