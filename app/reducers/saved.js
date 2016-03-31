import {TOGGLE_SAVE} from '../actions/save';

const initialState = true;

export default function editing(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SAVE:
      return action.saved

    default:
      return state;
  }
}
