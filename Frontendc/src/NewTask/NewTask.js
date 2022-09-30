import React from "react";
import useHttp from "../hooks/use-http";
import TaskForm from "./TaskForm";
const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskTitle, taskDescription, taskData) => {
    const id = taskData._id;
    const status = taskData.info.stat;
    const createdTask = {
      id: id,
      title: taskTitle,
      description: taskDescription,
      status: status,
    };
    props.onAddTask(createdTask)
  };

  const enterTaskHandler = async (taskTitle, taskDescription) => {
    sendTaskRequest(
      {
        url: "http://localhost:3000/todo/add-task",
        method: "POST",
        body: {
          title: taskTitle,
          description: taskDescription,
        },
      },
      createTask.bind(null, taskTitle, taskDescription)
    );
  };
  return (
    <React.Fragment>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p> {error}</p>}
    </React.Fragment>
  );
};

export default NewTask;
