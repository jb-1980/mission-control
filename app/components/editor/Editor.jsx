import React from 'react';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Topics from './Topics.jsx';
import Editable from './Editable.jsx';
import SaveButton from './SaveButton';
import ToggleEditButton from './ToggleEditButton';

import {createTopic} from '../../actions/topics';
import {createTitle} from '../../actions/title';
import {unSaveMission} from '../../actions/save';

import colorScheme from '../../constants/colors';

const colors = colorScheme[window.MC.userProfile.colors]

@DragDropContext(HTML5Backend)
@connect((state) => ({
  title: state.title,
  topics: state.topics
}), {
  createTitle,
  createTopic,
  unSaveMission
})
export default class Editor extends React.Component {
  constructor(){
    super();
    this.addTopic = this.addTopic.bind(this)
  }

  addTopic(){
    this.props.createTopic({
      name: 'Edit Topic Name'
    });
    this.props.unSaveMission();
  }

  render() {
    const {title, topics, createTitle} = this.props;
    return (
      <div className="pure-u-1 pure-u-md-2-3 dashboard-task-list-container">

        <div className="editor-task-list">
          <div style={{textAlign:'right'}}>
            <ToggleEditButton />
            <SaveButton />
          </div>
          <div className="dashboard-section-container">
            <div onClick={() => createTitle({title: title.title, editing: true})}>
              <Editable className="topic-name"
                editing={title.editing}
                value={title.title || 'Edit mission title'}
                onEdit={title => createTitle({title, editing: false})} />
            </div>
            <div className="edit-info-container">
              <h2 style={{marginTop:0}}>Welcome to the mission control center!</h2>
              <p>You can easily set up a new mission by giving it a title, adding
              some topics, and then using the search box to add some skills from
              Khan Academy.</p>
              <p>
                We see something awesome about to happen!
              </p>
              <button className="add-topic pure-button"
                onClick={this.addTopic}
                style={{backgroundColor: colors.mastery3}}
              >
                Add Topic
              </button>
            </div>
            <div className="up-next-outer-container">
              <Topics topics={topics} />
            </div>
          </div>
          <div style={{textAlign:'right'}}>
            <ToggleEditButton />
            <SaveButton />
          </div>
        </div>
        <div className="dashboard-task-list-footer"></div>
      </div>
    );
  }
}
