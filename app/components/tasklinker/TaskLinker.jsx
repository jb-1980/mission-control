import React from 'react';
import {connect} from 'react-redux';

import ToggleEditButton from '../editor/ToggleEditButton';
import UpNext from './UpNext';
import MasteryChallengeView from './MasteryChallengeView';
import UpcomingTasks from './UpcomingTasks';

@connect((state) =>({
  tasks: state.tasks,
  owner: state.editing.isMissionOwner
}))
export default class TaskLinker extends React.Component {
  render (){
    const {tasks, owner} = this.props;

    return (
      <div className="pure-u-1 pure-u-md-2-3 dashboard-task-list-container">
        {owner ? <div style={{textAlign:'right'}}>
          <ToggleEditButton />
        </div>: null}
        <div className="dashboard-task-list">
          <div className="dashboard-section-container math">
            <UpNext />
            <div id="mastery-challenge-container" className="math task-entry-container">
              <MasteryChallengeView />
            </div>
            <div className="up-next-outer-container">
              <UpcomingTasks tasks={tasks}/>
            </div>
          </div>
        </div>
        <div className="dashboard-task-list-footer"></div>
      </div>
    )
  }
}
