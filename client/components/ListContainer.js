import React, { useState } from 'react'
import ListForm from './ListForm'
import List from './List'
import './ListContainer.css'

function ListContainer(props) {

  const [list, setList]= useState(props.userList)

  const addListHandler = (data) => {
    setList([...list, data])
    console.log(list)
  }



  return (
    <div className='list_container'>
        <h3 className='title'>Your Lists</h3>
        <ListForm addListHandler = {addListHandler}/>
        <List list = {list}/>
    </div>
  )
}

export default ListContainer