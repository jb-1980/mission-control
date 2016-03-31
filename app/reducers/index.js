import {combineReducers} from 'redux';
import topics from './topics';
import tasks from './tasks';
import title from './title';
import editing from './editing';
import saved from './saved';

function mission_code(state='AAAAAA', action) {
  return state;
}

export default combineReducers({
  mission_code,
  editing,
  saved,
  title,
  topics,
  tasks
});
