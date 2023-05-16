import React from "react";
import "./TodoItem.css";

function TodoItem(props) {
  return (
    <div className="todo-item">
      <h1 className="todo-name">{props.name}</h1>
    </div>
  );
}

export default TodoItem;
