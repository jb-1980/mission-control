import * as types from '../actions/tasklist';

const initialState = [];

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_TASKS:
      return action.tasks

    default:
      return state;
  }
}
