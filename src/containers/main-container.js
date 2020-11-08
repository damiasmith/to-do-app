import React from 'react';
import axios from 'axios';
import CreateCard from '../components/create-card';
import ToDoCardContainer from './to-do-card-container';


export default class MainContainer extends React.Component {

  state = {
    cards: []
  }

  async componentDidMount () {
    let url = "https://qu03qxibli.execute-api.us-east-1.amazonaws.com/Prod/cards";
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
    try {
      const getCards = await axios.get(url, options)
      let cards = getCards.data;
      console.log('cards', cards);
      if (cards.body === "[]") {
        this.setState({
          cardsExist: false
        })
      } else {
        this.setState({
          cards: cards.body,
          cardsExist: true
        })
      }
    } catch (error) {
      console.log(error)
      throw new Error("No cards:", error)
    }
  };

  createNewCard = async (input) => {
    if (input === '') throw new Error('No input')
    let url = "https://qu03qxibli.execute-api.us-east-1.amazonaws.com/Prod/cards";
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
    let data = {
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


  addNewList = async (cardId, cardTitle, input) => {
    let url = "https://qu03qxibli.execute-api.us-east-1.amazonaws.com/Prod/lists"
    let data = {
      title: cardTitle,
      description: input,
      card_id: cardId,
      completed: false
    };
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
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

  handleClickList = async (cardId, listId) => {

    const foundCard = {...this.state.cards.find(card => card.id === cardId)}
    const foundList = foundCard.lists.find(list => list.id === listId)

    let newState = null

    if (foundList.completed) {
      newState = false
    } else {
      newState = true
    }

    let url = `https://qu03qxibli.execute-api.us-east-1.amazonaws.com/Prod/lists/${listId}`
    let data = {
      completed: newState
    };
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    try {
      const checkList = await axios.post(url, data, options)
      const newList = checkList.data;

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
      throw new Error("List not updted:", error)
    }
  };

  renderCards = async () => {

  }

  render() {
    let cardsExist = this.state.cardsExist;
    const renderCards = () => {
      if(cardsExist){
        return <ToDoCardContainer cards={this.state.cards} addList={this.addList} handleClickList={this.handleClickList} cardsExist={this.state.cardsExist}/>
      }
    }
    return (
      <div className="main-container">
        {renderCards()}
        <CreateCard createNewCard={this.createNewCard}/>
      </div>
    )
  }
}
