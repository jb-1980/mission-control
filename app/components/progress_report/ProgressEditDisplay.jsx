import React, {PropTypes} from 'react';

import Units from './Units';
import TaskRows from './TaskRows';
import ProgressCircle from './ProgressCircle';

export default ({tasks}) => {
  return(
    <div className="progress-bar-container info-container">
      <div className="mission-progress-icon-container">
        <div className="mission-progress-icon">
          <ProgressCircle tasks={tasks} />
        </div>
        <TaskRows tasks={tasks}/>
      </div>
      <div className="toggle-skills-link-container"></div>
      <Units />
    </div>
  )
}
