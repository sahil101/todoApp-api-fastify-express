import React, { useState } from "react";

const TaskForm = (props) => {
  //   //One way binding
  //   const taskInputTitleRef = useRef();
  //   const taskInputDescriptionRef = useRef();

  //Two way binding
  const [taskInputTitle, setTaskInputTitle] = useState("");
  const [taskInputDescription, setTaskInputDescription] = useState("");
  const submitHandler = (event) => {
    // const enteredTitle = taskInputTitleRef.current.value;
    // const enteredDescription = taskInputDescriptionRef.current.value;
    // console.log(enteredTitle, enteredDescription);
    console.log(taskInputTitle, taskInputDescription);
    if (
      taskInputDescription.trim().length > 0 &&
      taskInputTitle.trim().length > 0
    ) {
      props.onEnterTask(taskInputTitle, taskInputDescription);
    }
  };

  const onChangeTitleHandler = (event) => {
    setTaskInputTitle((prevTitle) => event.target.value);
  };

  const onChangeDescriptionHandler = (event) => {
    setTaskInputDescription((prevDescription) => event.target.value);
  };
  return (
    <React.Fragment>
      <label>title</label>
      <input
        type="text"
        value={taskInputTitle}
        onChange={onChangeTitleHandler}
      ></input>
      <label>description</label>
      <input
        type="text"
        value={taskInputDescription}
        onChange={onChangeDescriptionHandler}
      ></input>
      <button onClick={submitHandler}>
        {props.isloading ? "Sending...." : "Add Task"}
      </button>
    </React.Fragment>
  );
};

export default TaskForm;
