import React from 'react';
import {connect} from 'react-redux';
import { toggleEdit } from '../../actions/editing';

@connect((state) => ({
  editing: state.editing.isEditing,
  saved: state.saved
}),{
  toggleEdit
})
export default class ToggleEditButton extends React.Component {
  render() {
    const {editing,saved,toggleEdit} = this.props;

    return(
      <div style={{display:'inline-block',marginLeft: '2px',marginRight:'2px'}}>
        <button
          className="pure-button"
          onClick={toggleEdit}
          style={{
            backgroundColor: '#E6E6E6',
            color: '#555'
          }}
          >
          {editing ? (
            saved ? 'Finish editing' : 'Cancel editing')
             : 'Edit mission'}
        </button>
      </div>
    );
  }
}
