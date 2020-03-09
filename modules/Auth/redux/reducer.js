import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  data: {
    token: false,
    user: {}
  },
  error: false
};

export default function(state = initialState, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case actionTypes.SIGNUP_REQUEST: {
        draft.loading = true;
        draft.error = false;
        draft.data = Object.assign({}, initialState.data);
        break;
      }
      case actionTypes.SIGNUP_SUCCESS: {
        draft.loading = false;
        draft.error = false;
        draft.data.token = payload.token;
        draft.data.user = payload.user;
        break;
      }
      case actionTypes.SIGNUP_ERROR: {
        draft.loading = false;
        draft.error = true;
        draft.data = Object.assign({}, initialState.data);
        break;
      }
      case actionTypes.LOGOUT_SUCCESS: {
        draft.loading = false;
        draft.error = false;
        draft.data = Object.assign({}, initialState.data);
      }
    }
  });
}
