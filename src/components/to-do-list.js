import React from 'react'

const ToDoList = (props) => {
  const handleClick = (event) => {
    event.preventDefault()
    props.handleClickList(props.cardId, props.listId)
  }

  return (
    <div onClick={handleClick} className="to-do-list-container">
      <h4 className={props.list.completed ? "completed-list" : "to-do-list"}>
        {props.list.description}{props.list.completed ? "  ✔️" : null}
      </h4>
    </div>
  )
}

export default ToDoList