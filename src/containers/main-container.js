import React from 'react';
import axios from 'axios';
import CreateCard from '../components/create-card';
import ToDoCardContainer from './to-do-card-container';

export default class MainContainer extends React.Component {

  state = {
    cards: []
  }

  async componentDidMount () {
    const url = 'https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/cards';
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    try {
      const getCards = await axios.get(url, options)
      const cards = JSON.parse(getCards.data.body)
      console.log('cards', cards)

      if (cards === []) this.setState({cardsExist: false });
      else {
        this.setState({
          cards: cards,
          cardsExist: true
        })
      }

    } catch (error) {
      console.log('componemt', error)
      throw new Error('No cards:', error)
    }
  }

  createNewCard = async (input) => {
    if (input === '') throw new Error('No input');
    const url = 'https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/cards';
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    const data = {
      title: input
    }

    try {
      const addCard = await axios.post(url, data, options);
      const newCard = JSON.parse(addCard.data.body);

      this.setState({
        cards: [...this.state.cards, newCard]
      })

    } catch (error) {
      console.log('add cards', error)
      throw new Error('No cards added:', error)
    }
  }


  addList = async (cardId, cardTitle, input) => {
    const url = 'https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/lists'
    const data = {
      title: cardTitle,
      description: input,
      card_id: cardId,
      completed: false
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    try {
      const addList = await axios.post(url, data, options)
      const newList = JSON.parse(addList.data.body)
      const foundCard = {...this.state.cards.find(card => card.id === cardId)}

      if (foundCard.lists) foundCard.lists = [...foundCard.lists, newList]
      else foundCard.lists = [newList]

      const newCards = this.state.cards.map(card => {
        if (card.id === cardId) return foundCard
        else return card
      })

      this.setState({
        cards: newCards
      })
  
    } catch (error) {
      console.log('add lists:', error)
      throw new Error('No lists added:', error)
    }
  }

  handleClickList = async (cardId, listId) => {
    const url = 'https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/lists/id'
    const data = {
      id: cardId,
      list_id: listId
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }

    try {
      const checkList = await axios.post(url, data, options);
      const newCard = JSON.parse(checkList.data.body);

      const newCards = this.state.cards.map(card => {
        if (card.id === cardId) return newCard
        else return card
      })

      this.setState({
        cards: newCards
      })

    } catch (error) {
      console.log('update list:', error)
      throw new Error('No lists updated:', error)
    }
  }

  render() {
    const cardsExist = this.state.cardsExist;
    const renderCards = () => {
      if (cardsExist === true) {
        return (
          <ToDoCardContainer 
            cards={this.state.cards} 
            addList={this.addList} 
            cardsExist={this.state.cardsExist} 
            handleClickList={this.handleClickList}
          />
        )
      } else return null
    }

    return (
      <div className='main-container'>
        {renderCards()}
        <CreateCard createNewCard={this.createNewCard}/>
      </div>
    )
  }
}
