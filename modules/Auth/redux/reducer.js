import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  data: {
    token: false,
    user: {},
    participationTokens: {},
  },
  error: false,
};

export default function (state = initialState, { type, payload }) {
  return produce(state, (draft) => {
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
        break;
      }

      case actionTypes.FETCH_USER_REQUEST: {
        draft.loading = true;
        draft.error = false;
        draft.data.user = {};
        break;
      }
      case actionTypes.FETCH_USER_SUCCESS: {
        draft.loading = false;
        draft.error = false;
        draft.data.user = payload;
        break;
      }
      case actionTypes.FETCH_USER_ERROR: {
        draft.loading = false;
        draft.error = true;
        draft.data = Object.assign({}, initialState.data);
        break;
      }
      case actionTypes.FETCH_PARTICIPATION_TOKEN_SUCCESS: {
        const { eventId, token } = payload;
        draft.data.participationTokens[eventId] = token;
        break;
      }

      case actionTypes.WALLET_UPDATE_REQUEST: {
        draft.loading = true;
        break;
      }
      case actionTypes.WALLET_UPDATE_SUCCESS: {
        draft.loading = false;
        draft.error = false;
        draft.data.user.balance = payload.balance;
        break;
      }
      case actionTypes.WALLET_UPDATE_ERROR: {
        draft.loading = false;
        draft.error = true;
        break;
      }
    }
  });
}
