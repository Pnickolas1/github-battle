var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
const Link = require('react-router-dom').Link
var PropTypes = require('prop-types')
var PlayerPreview = require('./PlayerPreview')
var Loading = require('./Loading')

function Profile(props){
  const { info } = props

  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

function Player (props){
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}



class Results extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    console.log(this.props)
    var players = queryString.parse(this.props.location.search)
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(results){
      if (results == null ){
        return this.setState(function (){
          error: 'looks like there was an error, confirm both users exists';
          loading : false
        })
      }

      this.setState(function () {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    }.bind(this))
  }

  render() {
    const error = this.state.error
    const winner = this.state.winner
    const loser = this.state.loser
    const loading = this.state.loading

    if (loading === true ){
      return <p>Loading</p>
    }

    if (error ){
      return (
        <div>
          <p>
            {error}
            <Link to='/battle'>Reset</Link>
          </p>
        </div>
      )
    }
    
    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
                <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results; 
