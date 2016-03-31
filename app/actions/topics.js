import uuid from 'node-uuid';

export const CREATE_TOPIC = 'CREATE_TOPIC';
export function createTopic(topic) {
  return {
    type: CREATE_TOPIC,
    topic: {
      id: uuid.v4(),
      tasks: topic.tasks || [],
      ...topic
    }
  };
};

export const UPDATE_TOPIC = 'UPDATE_TOPIC';
export function updateTopic(updatedTopic) {
  return {
    type: UPDATE_TOPIC,
    ...updatedTopic
  };
};

export const DELETE_TOPIC = 'DELETE_TOPIC';
export function deleteTopic(id) {
  return {
    type: DELETE_TOPIC,
    id
  };
};

export const ATTACH_TO_TOPIC = 'ATTACH_TO_TOPIC';
export function attachToTopic(topicId, taskId) {
  return {
    type: ATTACH_TO_TOPIC,
    topicId,
    taskId
  };
};

export const DETACH_FROM_TOPIC = 'DETACH_FROM_TOPIC';
export function detachFromTopic(topicId, taskId) {
  return {
    type: DETACH_FROM_TOPIC,
    topicId,
    taskId
  };
};

export const MOVE = 'MOVE';
export function move({sourceId, targetId}) {
  return {
    type: MOVE,
    sourceId,
    targetId
  };
};
