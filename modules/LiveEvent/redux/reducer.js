import { produce } from "immer";
import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  error: false,
  data: null,
};

export default function (state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case actionTypes.TIMER_SYNC: {
        draft.data = payload;
      }
    }
  });
}
