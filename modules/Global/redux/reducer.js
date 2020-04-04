import { produce } from 'immer';
import * as actionTypes from './constants';

const initialState = {
  modals: {}
}

export default function(state = initialState, { type, payload }) {
  return produce(state, draft => {
    switch(type) {
      case actionTypes.OPEN_MODAL: {
        
        break;
      }
      case actionTypes.CLOSE_MODAL: {

        break;
      }
    }
  })
}