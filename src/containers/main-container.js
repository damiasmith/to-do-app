import React from 'react';
import axios from 'axios';
import CreateCard from '../components/create-card';
import ToDoCardContainer from './to-do-card-container';


export default class MainContainer extends React.Component {

  state = {
    cards: []
  }

  url = "http://localhost:3000/cards";
  options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
  }
  data;

  async componentDidMount (url, options) {
    try {
      const getCards = await axios.get(url, options)
      let cards = getCards.data;
        this.setState({
          cards: cards
        })
    } catch (error) {
      console.log(error)
      throw new Error("No cards:", error)
    }
  };

  createNewCard = async (input, url, data, options) => {
    data = {
      title: input
    };
    try {
      const addCard = await axios.post(url, data, options)
      const newCard = addCard.data;
      this.setState({
        cards: [...this.state.cards, newCard]
      })
    } catch (error) {
      console.log(error)
      throw new Error("Card not added:", error)
    }
  };


  addNewList = async (cardId, input, url, data, options) => {
    url = "http://localhost:3000/lists"
    data = {
      description: input,
      card_id: cardId,
      completed: false
    };
    try {
      const addList = await axios.post(url, data, options)
      let newList = addList.data;
      const foundCard = {...this.state.cards.find(card => card.id === cardId)}
      foundCard.lists = [...foundCard.lists, newList]

      const newCards = this.state.cards.map(card => {
        if (card.id === cardId){
          return foundCard
        } else {
          return card
        }
      })

      this.setState({
        cards: newCards
      })
  
    } catch (error) {
      console.log(error)
      throw new Error("List not added:", error)
    }
  };

  handleClickList = async (cardId, listId, url, data, options) => {

    const foundCard = {...this.state.cards.find(card => card.id === cardId)}
    const foundList = foundCard.lists.find(list => list.id === listId)

    let newState = null

    if (foundList.completed) {
      newState = false
    } else {
      newState = true
    }

    url = `http://localhost:3000/lists/${listId}`
    data = {
      completed: newState
    };

    try {
      const checkList = await axios.patch(url, data, options)
      const newList = checkList.data;

      const newLists = foundCard.lists.map(list => {
        if (list.id === listId){
          return newList
        } else {
          return list
        }
      })
      foundCard.lists = newLists


      const newCards = this.state.cards.map(card => {
        if (card.id === cardId) {
          return foundCard
        } else {
          return card
        }
      })

      this.setState({
        cards: newCards
      })
    } catch (error) {
      console.log(error)
      throw new Error("List not changed:", error)
    }
  };

  render(){
    return (
      <div className="main-container">
        <ToDoCardContainer cards={this.state.cards} addList={this.addList} handleClickList={this.handleClickList}/>
        <CreateCard createNewCard={this.createNewCard}/>
      </div>
    )
  }
}
