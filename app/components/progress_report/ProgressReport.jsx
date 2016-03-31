import React from 'react';
import {connect} from 'react-redux';

import Units from './Units';
import TaskRows from './TaskRows';
import ProgressCircle from './ProgressCircle';
import ProgressDisplay from './ProgressDisplay';
import ProgressEditDisplay from './ProgressEditDisplay';

@connect((state) => ({
  title: state.title,
  editing: state.editing,
  tasks: state.tasks
}))
export default class ProgressReport extends React.Component{
  render(){
    const {title, editing, tasks} = this.props;

    return (
      <aside className="pure-u-1 pure-u-md-1-3 dashboard-sidebar">
        <div className="mission-title">{title.title}</div>
        <div className="dashboard-section-container">
          <div className="completed section-header">
            <span>Mission Progress</span>
          </div>
        </div>
        <div className="dashboard-section-content mission-progress-container no-highlight-on-hover">
          {editing.isEditing ?
            <ProgressEditDisplay tasks={tasks} /> :
            <ProgressDisplay />
          }
        </div>
      </aside>
    )
  }
}
