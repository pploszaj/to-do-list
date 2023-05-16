import React, { useState } from "react";
import './TodoForm.css'

function TodoForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  // const [enteredType, setEnteredType] = useState(undefined);

  const inputHandler = (event) => {
    setEnteredTitle(event.target.value);
    console.log(props.currentList)
  };



  const submitHandler = (e) => {
    e.preventDefault();
    // props.addTodo(enteredTitle)
    fetch(`/api/todos/todo/${props.currentList}`,
    {method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: props.currentList, todos: [enteredTitle] })}
    )
    .then(response => response.json())
    .then(data => console.log(data))   //HEREEE
    .catch(err => console.log('oops got an error', err))

  }


  return (
    <form className="todo-form" onSubmit={submitHandler}>
      <input
        className="todo-input"
        type="text"
        placeholder="Add a to-do"
        name="text"
        onChange={inputHandler}
        autoComplete = 'off'
        value={enteredTitle}
      ></input>
      <button type="submit" className="button">ADD</button>
    </form>
  );
}

export default TodoForm;
