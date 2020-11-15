import React from 'react'
import ToDoList from './to-do-list'

class ToDoCard extends React.Component {

  state = {
    input: ''
  }

  handleListInput = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleListSubmit = (event) => {
    event.preventDefault()
    this.props.addList(this.props.card.id, this.props.card.Title, this.state.input)
    this.setState({
      cards: this.props.cards,
      input: ''
    })
  }

  handleDelete = (event) => {
    event.preventDefault()
    this.props.deleteCard(this.props.card.id)
    console.log(this.props.card.id)
    this.setState({
      cards: this.props.cards,
    })
  }

  renderLists() {
    if (this.props.card.lists) {
      return this.props.card.lists.map(list => {
        return (
          <ToDoList 
            key={list.id} 
            handleClickList={this.props.handleClickList} 
            cardId={this.props.card.id} 
            cardTitle={this.props.card.Title}
            listId={list.list_id}
            list={list}
          />
        )
      })
    } 
  }

  render() {
    return (
      <div className="to-do-card">
        <h3>{this.props.card.Title}</h3>
        <form onSubmit={this.handleListSubmit}>
          <input onChange={this.handleListInput} type="text" value={this.state.input} />
        </form>
        {this.renderLists()}
        <div class="delete-container">
          <button onClick={this.handleDelete} class="delete-button">
            x
          </button>
        </div>
      </div>
    )
  }
}

export default ToDoCard
