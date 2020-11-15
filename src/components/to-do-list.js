import React from 'react'

const ToDoList = (props) => {
  const handleClick = (event) => {
    event.preventDefault()
    props.handleClickList(props.cardId, props.listId)
  }
  const handleDelete = (event) => {
    event.preventDefault()
    props.deleteList(props.listId)
  }

  return (
    <div onClick={handleClick} className="to-do-list-container">
        <h4 className={props.list.completed ? "completed-list" : "to-do-list"}>
          <span class="to-do-list-title"> {props.list.description}{props.list.completed ? "  ✔️" : null} </span>
          <span class="delete-list-container">
            <button onClick={handleDelete}class="delete-list">
              x
            </button>
          </span>
        </h4>
    </div>
  )
}

export default ToDoList