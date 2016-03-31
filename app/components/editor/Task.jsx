import React from 'react';
import {connect} from 'react-redux';
import {DragSource, DropTarget} from 'react-dnd';
import FontAwesome from 'react-fontawesome';

import ItemTypes from '../../constants/itemTypes';

import {unSaveMission} from '../../actions/save';

const taskSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
  endDrag(props,monitor) {
    if(monitor.didDrop()){
      props.unSaveMission();
    }
  }
};

const taskTarget = {
  hover(targetProps, monitor) {

    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }
};

@DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.TASK, taskTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
@connect(()=>({}),{
  unSaveMission
})
export default class Task extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging, id, title,  unSaveMission, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <li
        style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>
        <span className="value">
          {title}&nbsp;
        </span>
        <FontAwesome className="delete-button" onClick={this.props.onDelete} name="times-circle"/>
      </li>
    ));
  }
}
