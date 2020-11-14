import React from 'react'

class CreateCard extends React.Component {

  state = {
    input: '',
    cards: this.props.cards
  }

  handleInput = (event) => {
    event.persist()
    this.setState({
      input: event.target.value,
      cards: this.props.cards
    })
  }

  handleNewCard = (event) => {
    event.preventDefault()
    this.props.createNewCard(this.state.input)
  }

  render(){
    return (
      <div className='create-new-card'>
        <form onSubmit={this.handleNewCard} className='new-card-form'>
          <h4 className='new-card-title'>New Task List</h4>
          <input onChange={this.handleInput} className='new-card-input' type='text' value={this.state.input} />
          <input className='new-card-input' type='submit' value='Create' />
        </form>
      </div>
    )
  }
}

export default CreateCard;
