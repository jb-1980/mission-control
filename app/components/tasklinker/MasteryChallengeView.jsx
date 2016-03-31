import React from 'react';
import FontAwesome from 'react-fontawesome';

import colorScheme from '../../constants/colors';

export default class MasteryChallengeView extends React.Component {
  render(){
    const colors = colorScheme[this.props.colors] || colorScheme[window.MC.userProfile.colors]
    return(
      <div id="mastery-challenge">
        <a className="task-link"
           href="https://www.khanacademy.org/mission/math"
           target="_blank"
           style={{display: "block"}}
        >
          <div className="info-container info-container-active pure-g"
            style={{
              backgroundColor: colors.mastery3,
              display:"flex",
              flexFlow: "row wrap"
            }}>
            <div className="task-preview-container pure-u-1-3 pure-u-sm-1-6">
              <div className="task-preview task-preview__mastery"
                style={{backgroundColor:colors.mastery3, borderColor:colors.mastery1}}>
                <FontAwesome name="trophy" className="mastery-trophy"/>
              </div>
            </div>
            <div className="mastery-task-info pure-u-2-3 pure-u-sm-7-12">
              <div className="task-recommender">&nbsp;</div>
              <div className="task-title">
                Mastery Challenge
              </div>
              <div className="task-description">
                Take Mastery Challenges on Khan Academy to strengthen skills and
                level up.
              </div>
            </div>
            <div className="annotations-container pure-u-1 pure-u-sm-1-4">
              <button className="start-button simple-button accent-button"
                style={{
                  border: "1px solid "+colors.mastery3,
                  backgroundColor: colors.mastery3,
                  backgroundImage: "linear-gradient(to bottom, "+colors.mastery1+", "+colors.mastery2+")",
                  backgroundRepeat: "repeat-x"
                }}>
                Level up on KA
              </button>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
