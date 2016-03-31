import update from 'react-addons-update';
import * as types from '../actions/topics';

const initialState = [];

export default function topics(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TOPIC:
      return [...state, action.topic];

    case types.UPDATE_TOPIC:
      return state.map((topic) => {
        if(topic.id === action.id) {
          return Object.assign({}, topic, action);
        }

        return topic;
      });

    case types.DELETE_TOPIC:
      return state.filter((topic) => topic.id !== action.id);

    case types.ATTACH_TO_TOPIC:
      const topicId = action.topicId;
      const taskId = action.taskId;

      return state.map((topic) => {
        const index = topic.tasks.indexOf(taskId);

        if(index >= 0) {
          return Object.assign({}, topic, {
            tasks: topic.tasks.length > 1 ? topic.tasks.slice(0, index).concat(
              topic.tasks.slice(index + 1)
            ): []
          });
        }
        if(topic.id === topicId) {
          return Object.assign({}, topic, {
            tasks: [...topic.tasks, taskId]
          });
        }

        return topic;
      });

    case types.DETACH_FROM_TOPIC:
      return state.map((topic) => {
        if(topic.id === action.topicId) {
          return Object.assign({}, topic, {
            tasks: topic.tasks.filter((id) => id !== action.taskId)
          });
        }

        return topic;
      });

    case types.MOVE:
      const sourceId = action.sourceId;
      const targetId = action.targetId;

      const topics = state;
      const sourceTopic = topics.filter((topic) => {
        return topic.tasks.indexOf(sourceId) >= 0;
      })[0];
      const targetTopic = topics.filter((topic) => {
        return topic.tasks.indexOf(targetId) >= 0;
      })[0];
      const sourceTaskIndex = sourceTopic.tasks.indexOf(sourceId);
      const targetTaskIndex = targetTopic.tasks.indexOf(targetId);

      if(sourceTopic === targetTopic) {
        return state.map((topic) => {
          return topic.id === sourceTopic.id ? Object.assign({}, topic, {
            tasks: update(sourceTopic.tasks, {
              $splice: [
                [sourceTaskIndex, 1],
                [targetTaskIndex, 0, sourceId]
              ]
            })
          }) : topic;
        });
      }
      else {
        return state.map((topic) => {
          if(topic === sourceTopic) {
            // get rid of the source task
            return Object.assign({}, topic, {
              tasks: topic.tasks.length > 1 ? topic.tasks.slice(0, sourceTaskIndex).concat(
                topic.tasks.slice(sourceTaskIndex + 1)
              ): []
            });
          }

          if(topic === targetTopic) {
            // and move it to target
            return Object.assign({}, topic, {
              tasks: topic.tasks.slice(0, targetTaskIndex).concat(
                [sourceId]
              ).concat(
                topic.tasks.slice(targetTaskIndex)
              )
            });
          }

          return topic;
        });
      }

      return state;

    default:
      return state;
  }
}
