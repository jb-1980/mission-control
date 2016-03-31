import React from 'react';
import {connect} from 'react-redux';

import Editor from './editor/Editor';
import TaskLinker from './tasklinker/TaskLinker';

@connect((state) => ({
  editing: state.editing.isEditing
}))
export default class WorkSpace extends React.Component {
  render(){
    const {editing} = this.props;
    if(editing){
      return <Editor/>
    }
    return <TaskLinker/>
  }
}
