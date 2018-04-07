const React = require('react');
const PropTypes = require('prop-types');
const PlayerPreview = require('./PlayerPreview')
const Link = require('react-router-dom').Link;



class PlayerInput extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState(() => ({username: value }))
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultPropTypes = {
  label: 'Username'
}

class Battle extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id, username){
    this.setState(() => ({
      [id + 'Name'] : username,
      [id + 'Image'] : `https://github.com/${username}.png?size=200`
    }))
  }

  handleReset(id){
    this.setState(() => ({
      [id + 'Name'] : '',
      [id + 'Image'] : null
    }))
  }

  render() {
    const { match } = this.props
    const { playerOneName, playerOneImage, playerTwoName, playerTwoImage } = this.state
    return (
      <div>
        <div className="row">
          {!playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
          />}

          {playerOneImage !== null && 
           <PlayerPreview
            avatar={playerOneImage}
            username={playerOneName}>
            <button
              className='reset'
              onClick={() => this.handleReset('playerOne')}>
              RESET
            </button>
          </PlayerPreview>}


          {!playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
          />}

          {playerTwoImage !== null && 
           <PlayerPreview
            avatar={playerTwoImage}
            username={playerTwoName}>
            <button
              className='reset'
              onClick={() => this.handleReset('playerTwo')}>
              RESET
            </button>
          </PlayerPreview>
          }
          
        </div>
          {playerOneImage && playerTwoImage &&
            <Link
              className='button'
              to={{
                pathname: match.url + '/results',
                search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
              }}>
              Battle
            </Link>
          }
      </div>
    )
  }
}

module.exports = Battle;
