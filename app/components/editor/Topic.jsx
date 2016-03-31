import React from 'react';
import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';
import {DropTarget} from 'react-dnd';

import ItemTypes from '../../constants/itemTypes';

import Tasks from './Tasks.jsx';
import Editable from './Editable.jsx';
import TaskSelector from './TaskSelector.jsx';

import * as topicActions from '../../actions/topics';
import * as taskActions from '../../actions/tasks';
import {unSaveMission} from '../../actions/save';


const taskTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.topic.tasks.length) {
      targetProps.attachToTopic(
        targetProps.topic.id,
        sourceId
      );
    }
  }
};

@connect((state) => ({
  allTasks: state.tasks
}), {
  ...topicActions,
  ...taskActions,
  unSaveMission
})
@DropTarget(ItemTypes.TASK, taskTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Topic extends React.Component {

  render() {
    const {connectDropTarget, topic, allTasks, ...props} = this.props;
    const topicTasks = topic.tasks.map((id) => allTasks[
      allTasks.findIndex((task) => task.id === id)
    ]).filter((task) => task);
    const topicId = topic.id;

    return connectDropTarget(
      <div {...props}>
        <div className="topic-header">
          <div className="topic-delete">
            <FontAwesome
              onClick={this.deleteTopic.bind(this, topicId)}
              name="times-circle"
              className="delete-button"
            />
          </div>
          <div onClick={() => props.updateTopic({id: topicId, editing: true})}>
            <Editable className="topic-name"
              editing={topic.editing}
              value={topic.name}
              onEdit={name => props.updateTopic({id: topicId, name, editing: false})} />
          </div>
          <div className="topic-add-task">

            <TaskSelector
              topicId = {topicId}
              value="" />
          </div>


        </div>
        <Tasks
          tasks={topicTasks}
          onValueClick={id => props.updateTask({id, editing: true})}
          onEdit={(id, task) => props.updateTask({id, task, editing: false})}
          onDelete={id => this.deleteTask(topicId, id)} />
      </div>
    );
  }
  deleteTopic(topicId, e) {
    e.stopPropagation();

    this.props.topic.tasks.forEach((taskId)=>{
      this.props.deleteTask(taskId)
    })
    this.props.deleteTopic(topicId);
    this.props.unSaveMission();
  }

  deleteTask(topicId, taskId) {
    this.props.detachFromTopic(topicId, taskId);
    this.props.deleteTask(taskId);
    this.props.unSaveMission();
  }
}
