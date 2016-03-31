import React from 'react';
import colorScheme from '../../constants/colors';

const colors = colorScheme[window.MC.userProfile.colors]

export default ({unit, tasks}) => {
  let taskMap = {}
  tasks.forEach(task =>{
    taskMap[task.id]=task
  })

  return (
    <div className="clearfix progress-by-topic">
      <div className="progress-by-topic__title">{unit.name}</div>
      {unit.tasks.map((task) =>
        <div
          key={task}
          className="progress-cell"
          style={{
            backgroundColor: taskMap[task].mastery_level ?
              colors[taskMap[task].mastery_level] : "#ddd"
          }}
        />
      )}
    </div>
  );
}
