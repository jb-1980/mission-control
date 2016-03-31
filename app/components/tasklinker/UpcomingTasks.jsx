import React from 'react';
import TaskEntryContainer from './TaskEntryContainer';

export default ({tasks}) => {
  const tasksObject = tasks.map(task => {
    if(task.mastery_level === 'unstarted'){
      return {
        id: task.id,
        title: task.title,
        image_url: "https://ka-exercise-screenshots.s3.amazonaws.com/"+task.name+".png",
        description: task.description,
        url: "http://www.khanacademy.org/exercise/"+task.name
      };
    }
  });
  const filtered_tasks = tasksObject.filter(task => {
    return task;
  })
  return (
    <div className="up-next-container">{filtered_tasks.slice(0,10).map((task) =>
      <TaskEntryContainer key={task.id} task={task} />
    )}
    </div>
  );
}
