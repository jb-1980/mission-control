import React, { Component } from 'react';
import {connect} from 'react-redux';

import Unit from './Unit';

@connect((state)=>({
  units: state.topics,
  tasks: state.tasks
}))
export default class Units extends Component {
  render(){
    const {units, tasks} = this.props;

    return (
      <div className="progress-cells">{units.map((unit) =>
        <Unit className="unit-row" key={unit.id} unit={unit} tasks={tasks} />
      )}</div>
    );
  }
}
