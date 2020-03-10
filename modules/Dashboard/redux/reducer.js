import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  createEvent: {
    loading: false,
    error: false
  },
  allEvents: {
    loading: false,
    error: false,
    data: []
  }
};

export default function reducer(state = initialState, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case actionTypes.CREATE_EVENT_REQUEST: {
        draft.createEvent.loading = true;
        draft.createEvent.error = false;
        break;
      }
      case actionTypes.CREATE_EVENT_SUCCESS: {
        draft.createEvent.loading = false;
        draft.createEvent.error = false;
        break;
      }
      case actionTypes.CREATE_EVENT_ERROR: {
        draft.createEvent.loading = false;
        draft.createEvent.error = true;
        break;
      }
    }
  });
}
