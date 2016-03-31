import * as types from '../actions/title';

const initialState = {
  title:'Edit mission title',
  editing: false
};

export default function title(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TITLE:
      return action;

    default:
      return state;
  }
}
