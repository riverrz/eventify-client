import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  error: false,
  data: {
    blob: null,
    duration: -1,
  },
};

export default function (state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case actionTypes.TIMER_SYNC: {
        draft.data.duration = payload;
      }
      case actionTypes.CONTENTFUL_EVENT_DATA: {
        draft.data.blob = payload;
      }
    }
  });
}
