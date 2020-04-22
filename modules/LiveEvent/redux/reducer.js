import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  error: false,
};

export default function (state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case actionTypes.LIVE_EVENT_START: {
        draft.loading = true;
        draft.error = false;
        break;
      }
      case actionTypes.LIVE_EVENT_END: {
        
        break;
      }
    }
  });
}
