import React from 'react';
import fetch from 'isomorphic-fetch';

import Header from './Header';
import ProgressCircle from './progress_report/ProgressCircle';
import TaskRows from './progress_report/TaskRows';
import MasteryChallengeView from './tasklinker/MasteryChallengeView';
import TaskEntryContainer from './tasklinker/TaskEntryContainer';

import colorScheme from '../constants/colors';

export default class Profile extends React.Component {
  constructor(){
    super()
    this.changeColor = this.changeColor.bind(this);
    this.saveTheme = this.saveTheme.bind(this);
  }

  changeColor(e){
    window.MC.userProfile.colors = e.target.value;
    this.setState({})
  }

  saveTheme(){
    fetch('/api/user/theme', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kaid: window.MC.userProfile.kaid,
        color: window.MC.userProfile.colors
      })
    })
    
  }

  render(){
    const tasks = [
      {mastery_level: 'mastery3'},
      {mastery_level: 'mastery2'},
      {mastery_level: 'mastery1'},
      {mastery_level: 'practiced'},
      {mastery_level: 'unstarted'},
    ]

    const task = {
      title: 'Testing your colors',
      name: 'antiderivatives',
      url: '',
      image_url: 'https://ka-exercise-screenshots.s3.amazonaws.com/antiderivatives.png',
      description: 'Find the color that you like and set it in your profile'
    }
    const colors = window.MC.userProfile.colors;
    return (
      <div>
        <Header colors={colors}/>
        <div  className="contained-and-centered clearfix" style={{textAlign:"center"}}>
          <h1>{window.MC.userProfile.nickname}</h1>
          Select your color theme:
          <select value={colors} onChange={this.changeColor}>
            <option value="red">Red</option>
            <option value="pink">Pink</option>
            <option value="purple">Purple</option>
            <option value="indigo">Indigo</option>
            <option value="blue">Blue</option>
            <option value="teal">Teal</option>
            <option value="green">Green</option>
            <option value="amber">Amber</option>
            <option value="orange">Orange</option>
            <option value="brown">Brown</option>
            <option value="bluegrey">Blue Grey</option>
          </select>
          <div className="mission-progress-icon-container"
            style={{marginTop:"20px",marginBottom:"20px"}}>
            <div className="mission-progress-icon">
              <ProgressCircle tasks={tasks} colors={colors}/>
            </div>
            <TaskRows tasks={tasks}/>
          </div>
          <div className="profile-mastery">
            <MasteryChallengeView colors={colors}/>
          </div>
          <div className="profile-task-link">
            <TaskEntryContainer task={task} colors={colors}/>
          </div>
          <button
            onClick={this.saveTheme}
            className="pure-button"
            style={{
              background: colorScheme[colors].mastery3,
              color: colorScheme[colors].lightFont
            }}
          >
          Save theme</button>
        </div>
      </div>
    )
  }
}
