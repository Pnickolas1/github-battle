var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');


// a component is concerned about 3 things: 
//state
// lifecycle methods
// ui


class App extends React.Component {
  render() {
    return (
      <div>Hello Peter Tountas!</div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);