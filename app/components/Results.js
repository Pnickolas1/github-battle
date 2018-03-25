var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');

class Results extends React.Component{
  componentDidMount() {
    var players = queryString.parse(this.props.location.search)
    api.battle([
      players.playerOneName,
      players.playTwoname
    ]).then(function(results){
      console.log(results)
    })
  }

  render() {
  
    return (
      <div>Results</div>
    )
  }
}

module.exports = Results; 
