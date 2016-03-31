import fetch from 'isomorphic-fetch'


export const REQUEST_TASKS = 'REQUEST_TASKS';
function requestTasks(tasks) {
  return {
    type: REQUEST_POSTS,
    tasks
  }
}

export const RECEIVE_TASKS = 'RECEIVE_TASKS';
function receiveTasks(task_list) {
  return {
    type: RECEIVE_TASKS,
    task_list
  }
}

export const FETCH_TASKs = 'FETCH_TASKS';
export function fetchTasks(tasks) {
  return fetch('/api/tasklist/'+tasks)
      .then(response => response.json())
      .then(json => {
        return receiveTasks(json.tasks)
      })

}
