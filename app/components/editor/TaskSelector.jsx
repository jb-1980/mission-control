import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';

import {attachToTopic} from '../../actions/topics';
import {createTask} from '../../actions/tasks';
import {unSaveMission} from '../../actions/save';

import colorScheme from '../../constants/colors';

const colors = colorScheme[window.MC.userProfile.colors]
const MAX_TASKS = 10;
const ASYNC_DELAY = 500;

@connect((state) => ({}), {
  attachToTopic,
  createTask,
  unSaveMission
})
export default class TaskSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ''}
    this.onChange = this.onChange.bind(this)
    this.addTask = this.addTask.bind(this)
    this.getTasks = this.getTasks.bind(this)
  }

  getTasks (input, callback) {
    input = input.toLowerCase() || 'a';
    fetch('/api/tasklist/'+input)
    .then(response => response.json())
    .then(json => {
      var data = {
        options: json.tasks.slice(0, MAX_TASKS),
        complete: json.tasks <= MAX_TASKS
      };
      callback(null,data);
    })
  }

  onChange (value) {
    this.setState({
      value: value,
    });
  }

  addTask(topicId,task,e) {
    e.stopPropagation();
    this.setState({
      value: ''
    })
    if(task.title === undefined){
      return null;
    }
    let id_name = task.name.split('~')
    const o = this.props.createTask({
      id: id_name[0],
      title: task.title,
      name: id_name[1]
    });
    this.props.attachToTopic(topicId, o.task.id);
    this.props.unSaveMission();
  }

  render() {
    const {value, topicId} = this.props;

    return (
      <div className="pure-g">
        <div className="pure-u-5-6">


        <Select.Async
            value={this.state.value}
            onChange={this.onChange}
            valueKey="name"
            labelKey="title"
            loadOptions={this.getTasks}
          />
        </div>
        <div className="pure-u-1-6">
          <button
            onClick={this.addTask.bind(this, topicId,this.state.value)}
            style={{backgroundColor: colors.mastery3}}
          >
            Add task
          </button>
        </div>

      </div>
    );
  }
}
