import React from 'react'
import ToDoCard from '../components/to-do-card'

function ToDoCardContainer(props){
  console.log ('props:', props);
  function renderCards(){
    if (props.cardsExist) {
      return props.cards.map(card => {
        return <ToDoCard key={card.id} handleClickList={props.handleClickList} addList={props.addList} card={card}/>
      })
    } else return ''
  }

  return (
    <div>
      {renderCards()}
    </div>
  )
}

export default ToDoCardContainer;