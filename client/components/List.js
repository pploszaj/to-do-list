import React, {useState} from "react";
import ListItem from "./ListItem";
import "./List.css";
import TodoForm from "./TodoForm";

function List(props) {
  const [todos, setTodos] = useState('')
  const [currentList, setCurrentList] = useState('');

  const addTodo = (todo) => {
    setTodos(todo)
  }

  const set = (cur) => {
    setCurrentList(cur)
  }

  return (
    <div>
      <div className="list_of_lists">
        {props.list.map((el, index) => (
          <ListItem title={el.name} id={el.name} todos = {todos} set = {set}/>
        ))}
      </div>
      <div className="todo_form">
        <TodoForm addTodo = {addTodo} currentList = {currentList} />
      </div>
    </div>
  );
}

export default List;
