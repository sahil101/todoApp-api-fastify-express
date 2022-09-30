import "./App.css";
import React, { useEffect, useState } from "react";
import NewTask from "./NewTask/NewTask";
import Tasks from "./Tasks/Tasks";
import useHttp from "./hooks/use-http";
function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = [];
      for (let i = 0; i < taskObj.length; i++) {
        loadedTasks.push({
          id: taskObj[i]._id,
          title: taskObj[i].info.title,
          description: taskObj[i].info.description,
          status: taskObj[i].info.stat,
        });
      }
      setTasks(loadedTasks);
    };
    fetchTasks({url : "http://localhost:3000/todo/get-tasks"}, transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler}></NewTask>
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      ></Tasks>
    </React.Fragment>
  );
}

export default App;
