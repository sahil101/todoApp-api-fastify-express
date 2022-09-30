import React from "react";
import TaskItem from "./TaskItem";

const Tasks = (props) => {
  let taskList = <h1>No tasks found. Start adding some</h1>;
  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem key= {task.id}>
            <p>{task.title}
            {task.description}
            {task.status}</p>
          </TaskItem>
        ))}
      </ul>
    );
  }
  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try Again</button>;
  }
  if (props.loading) {
    content = "loading tasks";
  }

  return (
    <React.Fragment>
      <div>{content}</div>
    </React.Fragment>
  );
};
export default Tasks;
