import uuid from 'node-uuid';

export const CREATE_TASK = 'CREATE_TASK';
export function createTask(task) {
  return {
    type: CREATE_TASK,
    task
  };
};

export const UPDATE_TASK = 'UPDATE_TASK';
export function updateTask(updatedTask) {
  return {
    type: UPDATE_TASK,
    ...updatedTask
  };
};

export const DELETE_TASK = 'DELETE_TASK';
export function deleteTask(id) {
  return {
    type: DELETE_TASK,
    id
  };
};

export const REQUEST_PROGRESS_LEVEL = "REQUEST_PROGRESS_LEVEL";
function requestProgressLevel(tasks){
  return {
    type: REQUEST_PROGRESS_LEVEL,
    tasks
  }
}

export const RECEIVE_PROGRESS_LEVEL = "RECEIVE_PROGRESS_LEVEL";
function receiveProgressLevels(tasks){
  console.log('in receiveProgressLevels')
  return {
    type: RECEIVE_PROGRESS_LEVEL,
    tasks
  }
}

export function getProgressLevels(tasks){
  return (dispatch => {
    fetch('/api/tasks/progress', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'POST',
      body: JSON.stringify({
        tasks:tasks,
        kaid: window.MC.userProfile.kaid
      })
    })
    .then(response => response.json())
    .then(json =>{
      dispatch({
        type: RECEIVE_PROGRESS_LEVEL,
        tasks:json
      })
    });
  });
}
