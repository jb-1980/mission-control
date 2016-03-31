import React from 'react';
import Topic from './Topic.jsx';

export default ({topics}) => {
  return (
    <div className="topics">{topics.map((topic) =>
      <Topic className="topic clearfix" key={topic.id} topic={topic} />
    )}</div>
  );
}
