import React from 'react';
import {connect} from 'react-redux';
import { saveMission } from '../../actions/save';

import colorScheme from '../../constants/colors';

const colors = colorScheme[window.MC.userProfile.colors]

@connect((state) => ({
  saved: state.saved,
  title: state.title,
  topics: state.topics,
  tasks: state.tasks,
  mission_code: state.mission_code
}),{
  saveMission
})
export default class SaveButton extends React.Component {
  constructor(){
    super();
    this.saveMission = this.saveMission.bind(this)
  }

  saveMission(){
    fetch('/api/mission/save', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'POST',
      body: JSON.stringify({
        title: this.props.title,
        topics: this.props.topics,
        tasks: this.props.tasks,
        code: this.props.mission_code,
        kaid: window.MC.userProfile.kaid
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.saved){
        this.props.saveMission()
      };
    });
  }
  render() {
    const { saved } = this.props;
    return(
      <div style={{display:'inline-block',marginLeft:'2px',marginRight:'2px'}}>
        <button
          className="pure-button"
          onClick={saved ? null : this.saveMission}
          style={{
            backgroundColor: (saved ? '#E6E6E6' : colors.mastery3),
            color: (saved ? '#555' : colors.lightFont)
          }}
          >
          {saved ? 'Mission saved' : 'Save mission'}
        </button>
      </div>
    );
  }
}
