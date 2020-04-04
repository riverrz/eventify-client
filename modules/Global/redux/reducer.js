import { produce } from "immer";
import nanoid from "nanoid";
import {} from "ramda";
import * as actionTypes from "./constants";

const initialState = {
  modals: {},
};

export default function (state = initialState, { type, payload }) {
  return produce(state, (draft) => {
    switch (type) {
      case actionTypes.OPEN_MODAL: {
        const id = nanoid();
        draft.modals[id] = { ...payload, id };
        break;
      }
      case actionTypes.CLOSE_MODAL: {
        const { id } = payload;
        draft.modals = omit([id], draft.modals);
        break;
      }
    }
  });
}
