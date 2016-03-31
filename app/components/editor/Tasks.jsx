import React from 'react';
import {connect} from 'react-redux';

import Editable from './Editable.jsx';
import Task from './Task.jsx';

import {move} from '../../actions/topics';
import {unSaveMission} from '../../actions/save';

@connect(() => ({}), {
  move,
  unSaveMission
})
export default class Tasks extends React.Component {
  render() {
    const {tasks, move, onDelete, unSaveMission} = this.props;

    return (
      <ul className="tasks">
        {tasks.map((task) =>
          <Task
            className="task"
            id = {task.id}
            title = {task.title}
            key={task.id}
            onMove={move}
            unSaveMission={unSaveMission}
            onDelete={onDelete.bind(null,task.id)}
          />
        )}
      </ul>
    );
  }
}
