import React from 'react';
import colorScheme from '../../constants/colors';

export default ({task, colors=window.MC.userProfile.colors }) => {
  colors = colorScheme[colors];

  return (
    <div className="task-entry-container upcoming-task">
      <a tabIndex="-1"
        className="task-link"
        style={{display:"block"}}
        href={task.url}
        target="_blank"
        >
        <div className="pure-g" style={{display:"flex",flexFlow:"row wrap"}}>
          <div className="pure-u-1-3 pure-u-sm-1-6 task-preview-container">
            <div className="task-preview">
              <img src={task.image_url} />
            </div>
          </div>
          <div className="info-container pure-u-2-3 pure-u-sm-7-12">
            <div className="task-title">{task.title}</div>
            <div className="task-description"
              dangerouslySetInnerHTML={{__html:task.description}}/>
          </div>
          <div className="annotations-container pure-u-sm-1-4 pure-u-1">
            <button className="task-badge no-underline"
              style={{
                borderColor: colors.mastery1,
                color: colors.mastery1
              }}>Practice at KA</button>
          </div>
        </div>
      </a>
    </div>
  );
}
