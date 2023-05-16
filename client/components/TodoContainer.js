import React from 'react'
import TodoForm from './TodoForm'
import './TodoContainer.css'
import ListContainer from './ListContainer'

function TodoContainer(props) {
  return (
    <div className='form_container'>
      <ListContainer userList = {props.userList}/>
      
    </div>
  )
}

export default TodoContainer