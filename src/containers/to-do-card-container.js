import React from 'react'
import ToDoCard from '../components/to-do-card'

const ToDoCardContainer = (props) =>{
  const renderCards = () => {
    if (props.cardsExist) {
      return props.cards.map(card => {
        return (
        <ToDoCard 
          key={card.id} 
          handleClickList={props.handleClickList} 
          addList={props.addList} 
          deleteCard={props.deleteCard}
          deleteList={props.deleteList}
          card={card}
          />
        )      
      })
    } else return null
  }

  return (
    <div>
      {renderCards()}
    </div>
  )
}

export default ToDoCardContainer;