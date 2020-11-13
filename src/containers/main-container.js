import React from 'react';
import axios from 'axios';
import CreateCard from '../components/create-card';
import ToDoCardContainer from './to-do-card-container';


export default class MainContainer extends React.Component {

  state = {
    cards: []
  }

  async componentDidMount () {
    let url = "https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/cards";
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
    try {
      const getCards = await axios.get(url, options)
      let cards = JSON.parse(getCards.data.body);
      console.log('cards', cards);
      if (cards === []) {
        this.setState({
          cardsExist: false
        })
      } else {
        this.setState({
          cards: cards,
          cardsExist: true
        })
      }
    } catch (error) {
      console.log('componemt', error)
      throw new Error("No cards:", error)
    }
  };

  createNewCard = async (input) => {
    if (input === '') throw new Error('No input')
    let url = "https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/cards";
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
      const newCard = JSON.parse(addCard.data.body);
      console.log('newCard:', newCard)
      let newCards = [...this.state.cards, newCard]
      console.log('newCards:', newCards)
      this.setState({
        cards: newCards
      })
      // console.log('cards:', cards)

    } catch (error) {
      console.log("add cards", error)
      throw new Error("No cards added:", error)
    }
  };


  addList = async (cardId, cardTitle, input) => {
    let url = "https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/lists"
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
      let newList = JSON.parse(addList.data.body);
      const foundCard = {...this.state.cards.find(card => card.id === cardId)}
      if (foundCard.lists) foundCard.lists = [...foundCard.lists, newList]
      else foundCard.lists = [newList]

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
      console.log("add lists:", error)
      throw new Error("No lists added:", error)
    }
  };

  handleClickList = async (cardId, listId) => {

    let url = `https://irxlr7j4t2.execute-api.us-east-1.amazonaws.com/dev/lists/id`
    let data = {
      id: cardId,
      list_id: listId
    };
    console.log("data:", data);
    let options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }

    try {
      const checkList = await axios.post(url, data, options)
      const newCard = JSON.parse(checkList.data.body);

      const newCards = this.state.cards.map(card => {
        if (card.id === cardId) {
          return newCard
        } else {
          return card;
        }
      })
        this.setState({
        cards: newCards
      })

    } catch (error) {
      console.log("update list:", error)
      throw new Error("No lists updated:", error)
    }
  };

  render() {
    let cardsExist = this.state.cardsExist;
    const renderCards = () => {
      if (cardsExist === true){
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
      <div className="main-container">
        {renderCards()}
        <CreateCard createNewCard={this.createNewCard}/>
      </div>
    )
  }
}
