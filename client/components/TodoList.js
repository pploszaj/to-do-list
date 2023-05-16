import React, {useEffect, useState} from 'react'
import TodoItem from './TodoItem'
import './TodoList.css'

function TodoList(props) {
  const [todos,setTodos] = useState([])

  useEffect(() => {
    setTodos([...todos, props.todos])
  }, [])


  return (
    <div className='todo-list'>
      TODO LIST
      {props.fetchedData.filter(() => props.listID === props.currList).map(el => <TodoItem name = {el}/>)}
    </div>
  )
}

export default TodoList