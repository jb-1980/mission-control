import {TOGGLE_EDIT, TOGGLE_OWNER} from '../actions/editing';

const initialState = {
  isEditing: false,
  isMissionOwner: false
}

export default function editing(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT:
      return Object.assign({}, state, {
        isEditing: !state.isEditing
      })

    case TOGGLE_OWNER:
      return Object.assign({}, state, {
        isMissionOwner: !state.isMissionOwner
      })

    default:
      return state;
  }
}
