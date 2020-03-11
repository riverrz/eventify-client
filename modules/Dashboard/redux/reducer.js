import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  createEvent: {
    loading: false,
    error: false
  },
  events: {
    loading: false,
    error: false,
    data: {} // {createdEvents: [], invitedEvents: []}
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
      case actionTypes.FETCH_ALL_EVENTS_REQUEST: {
        draft.events.loading = true;
        draft.events.error = false;
      }
      case actionTypes.FETCH_ALL_EVENTS_SUCCESS: {
        draft.events.loading = false;
        draft.events.error = false;
        draft.events.data = payload;
      }
      case actionTypes.FETCH_ALL_EVENTS_ERROR: {
        draft.events.loading = false;
        draft.events.error = true;
      }
    }
  });
}
