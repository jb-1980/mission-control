import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {getProgressLevels} from '../../actions/tasks';

import Units from './Units';
import TaskRows from './TaskRows';
import ProgressCircle from './ProgressCircle';

import colorScheme from '../../constants/colors';

const colors = colorScheme[window.MC.userProfile.colors]

@connect((state) => ({
  tasks: state.tasks
}))
export default class ProgressDisplay extends React.Component{
  constructor(props){
    super(props)
    this.updateTaskProgress = this.updateTaskProgress.bind(this);
  }

  componentDidMount() {
    const {dispatch, tasks} = this.props;
    const taskList = tasks.map(task => {
      return task.name
    })
    dispatch(getProgressLevels(taskList))
  }

  updateTaskProgress(){
    const {dispatch, tasks} = this.props;
    const taskList = tasks.map(task => {
      return task.name
    })
    dispatch(getProgressLevels(taskList))
  }

  render(){
    const {tasks} = this.props;
    return(
      <div className="progress-bar-container info-container">
        <div className="mission-progress-icon-container">
          <div className="mission-progress-icon">
            <ProgressCircle tasks={tasks}/>
          </div>
          <TaskRows tasks={tasks}/>
        </div>
        <div className="toggle-skills-link-container">
          <button
            style={{
              backgroundColor: colors.mastery2,
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '5px',
              margin: '10px'
            }}
            onClick={this.updateTaskProgress}
          >
          Sync progress from KA
          </button>
        </div>
        <Units />
      </div>
    )

  }
}
