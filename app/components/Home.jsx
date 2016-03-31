import React from 'react';
import Modal from 'react-modal';
import fetch from 'isomorphic-fetch';

import MissionBox from './homepage/MissionBox';
import colorScheme from '../constants/colors';

const colors = colorScheme[window.MC.userProfile.colors]

export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {
      missions:window.MC.__INITIAL_STATE__.missions || [],
      modalIsOpen: false,
      joinMissionCode:'Code (ECM67J)',
      joinedMissionError: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.joinMission = this.joinMission.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      joinedMissionError: false,
      joinMissionCode:'Code (ECM67J)'
    });
  }

  handleChange(event){
    this.setState({joinMissionCode: event.target.value, joinedMissionError:false})
  }

  joinMission(){
    fetch('/api/user/mission/join',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'POST',
      body: JSON.stringify({
        mission_code:this.state.joinMissionCode,
        kaid: window.MC.userProfile.kaid})
    })
    .then(response => response.json())
    .then(json => {
      if(json.message === 'success'){
        this.setState({
          joinedMissionError:json.message,
          missions: [...this.state.missions, json.mission]
        })
      }
      else if(json.message === 'current'){
        this.setState({
          joinedMissionError:'success'
        })
      }
      else{
        this.setState({joinedMissionError:json.message})
      }
    })

  }
  render(){
    return window.MC.userProfile.is_authenticated ? this.renderLoggedIn() : this.renderLogin();
  }

  renderLoggedIn() {
    const customStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding:'20px',
        borderRadius:'5px'

      }
    };
    return (
      <div className="pure-u-1">
        <div className="splash-container" style={{backgroundColor: colors.mastery1}}>
          <div className="splash">
            <h1 className="splash-head">Mission Control</h1>
            <p className="splash-subhead">
              Take your Khan Academy study guide to the next level
            </p>
            <div className="pure-g" style={{padding:"10px"}}>
              <div className="pure-u-1-2">
                <button
                  onClick={this.openModal}
                  className="pure-button home-button"
                  style={{
                  width:"65%",
                  backgroundColor:colors.mastery3,
                  color: "#fff",
                  borderRadius: "15px",
                  border: "3px solid #fff",
                  whiteSpace: "normal"
                  }}
                >
                  Join Mission
                </button>
              </div>
              <div className="pure-u-1-2">
                <a
                  href="/mission/create"
                  className="pure-button home-button"
                  style={{
                  width:"65%",
                  backgroundColor:colors.mastery3,
                  color: "#fff",
                  borderRadius: "15px",
                  border: "3px solid #fff",
                  whiteSpace: "normal",
                  textTransform: "none"
                  }}
                  >
                   Create new Mission
                </a>
              </div>
            </div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles} >
              <div
                style={{
                  float:"right",
                  color:"#ddd",
                  cursor:"pointer",
                  fontSize: "1.3em"
                }}
                onClick={this.closeModal}
                >
                &times;
              </div>
              <h2 style={{textAlign:"center"}}>Join a mission</h2>
              <h4>Enter a mission code to join a unique mission</h4>
              {this.state.joinedMissionError==='error' &&
                <div style={{color:"#f00"}}>
                  *No Mission found for code {this.state.joinMissionCode}
                </div>
              }
              {this.state.joinedMissionError==='success' &&
                <div style={{color:"#0f0"}}>
                  Mission {this.state.joinedMissionCode} joined!
                </div>
              }
              <div style={{width:"100%"}} className="pure-form">
                <input
                  type="text"
                  placeholder={this.state.joinMissionCode}
                  onChange={this.handleChange}
                  style={{width:"100%",lineHeight:"20px"}}/>
              </div>
              <div style={{textAlign:"center",padding:"5px"}}>
                  <button
                    className="pure-button"
                    onClick={this.joinMission}
                    style={{
                      fontSize: "1.3em",
                      border: "1px solid #ccc",
                      color: "#fff",
                      borderRadius: "5px",
                      backgroundColor: colors.mastery3,
                      width: "85%",
                      lineHeight: "20px"}}
                    >
                    Join Mission
                  </button>
              </div>

            </Modal>
          </div>
        </div>
        <div className="content">
          <h2 className="content-head is-center">Current missions</h2>
          <div className="pure-g">
            {this.state.missions.map(mission =>{
              return <MissionBox key={mission.code} mission={mission}/>
            })}
          </div>
        </div>
      </div>
    )
  }

  renderLogin(){
    return (
      <div className="pure-u-1">
      <div className="splash-container" style={{backgroundColor: colors.mastery1}}>
        <div className="splash">
          <h1 className="splash-head">Mission Control</h1>
          <p className="splash-subhead">
            Take your Khan Academy study guide to the next level
          </p>
          <p>
            <a href="/khan/authorize"
              className="pure-button home-button"
              style={{
              width:"65%",
              backgroundColor:colors.mastery3,
              color: "#fff",
              borderRadius: "15px",
              border: "3px solid #fff",
              whiteSpace: "normal",
              textTransform: "none"
              }}
            >
             Login with your Khan Academy account
            </a>
          </p>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content">
          <h2 className="content-head is-center">
            <a
              href="https://www.khanacademy.org/coach-res/reference-for-coaches/how-to/a/create-a-study-guide"
              style={{color: colors.mastery2}}
            >
              Make an interactive study guide.
            </a>
          </h2>
          <div className="pure-g l-box">
            <div className="l-box pure-u-5-12">
              <h3 className="content-subhead" style={{color: colors.mastery2}}>
                Khan is awesome. But...
              </h3>
              <p>
                It seems none of the missions fit my needs. With mission control you
                can set your own skills in a mission, and your students can then easily
                click on those skills and practice them in Khan Academy.
              </p>
            </div>
            <div className="l-box pure-u-5-12">
              <h3 className="content-subhead" style={{color: colors.mastery2}}>
                No more messy papers
              </h3>
              <p>
                With a mission control checklist, all the data and progress are synced
                over from Khan Academy through their extensive api. You can really just
                set up your mission and easily track students' progress through it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
