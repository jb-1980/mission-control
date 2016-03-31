import React from 'react';

import ProgressReport from '../components/progress_report/ProgressReport';
import WorkSpace from '../components/WorkSpace';

export default class App extends React.Component {
  render (){
    return (
      <div className="dashboard-root">
        <div className="contained-and-centered clearfix">
          <div className="pure-g" style={{display:"flex", flexFlow: "row wrap"}}>
            <ProgressReport />
            <WorkSpace />
          </div>
        </div>
      </div>
    );
  }
}
