import React, {useEffect, useState} from 'react'
import './ListItem.css'
import TodoList from './TodoList'

function ListItem(props) {
  const [list, setList] = useState('')
  const [showList, setShowList] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)

  const clickHandler = (e) => {
    console.log("click value:", e.target.value);
    setList(e.target.value)
  }

  

  useEffect(() => {
    props.set(list);
    fetch(`/api/todos/list/${list}`)
    .then(response => {
      console.log(response);
      return response.text();
    })
    .then(data => JSON.parse(data))
    .then(todos => {
      console.log(todos.todos)
      setFetchedData(todos.todos)
      setShowList(true);
    })
    .catch(err => {
      console.log(err, 'error')
    })
  }, [list])
    
  

  

  return (
    <div className='item_container'>
      <label htmlFor={props.index}>
        <input type="radio" name="option" id = {props.id} value={props.title} onChange={clickHandler}/>
        <button>{props.title}</button>
      </label>  
      {showList && <TodoList listID = {props.id} currList = {list} fetchedData = {fetchedData} />} 
    </div>
  
  )
}

export default ListItem