import {CREATE_TASK, UPDATE_TASK,
        DELETE_TASK, RECEIVE_PROGRESS_LEVEL,
        REQUEST_PROGRESS_LEVEL} from '../actions/tasks';

const initialState = [];

export default function tasks(state = initialState, action) {
  switch (action.type) {
    case CREATE_TASK:
      return [...state, action.task];

    case UPDATE_TASK:
      return state.map((task) => {
        if(task.id === action.id) {
          return Object.assign({}, task, action);
        }

        return task;
      });

    case DELETE_TASK:
      return state.filter((task) => task.id !== action.id);

    case RECEIVE_PROGRESS_LEVEL:
    case REQUEST_PROGRESS_LEVEL:
      return action.tasks;

    default:
      return state;
  }
}
